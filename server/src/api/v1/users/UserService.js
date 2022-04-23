const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');
const { randomString } = require('../shared/generator');
const User = require('./User');
const EmailService = require('../email/EmailService');
const EmailException = require('../email/EmailException');
const InvalidTokenException = require('./InvalidTokenException');
const FileService = require('../file/FileService');
const Role = require('./Role');

const save = async (body) => {
  const { username, password, email, role } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    password: hash,
    activationToken: randomString(16)
  };
  const transaction = await sequelize.transaction();

  const [userCreated, userRole] = await Promise.all([
    await User.create(user, { transaction }),
    await Role.findOne({ where: { role } })
  ]);

  await userCreated.addRole(userRole, { transaction });

  try {
    await EmailService.sendAccountActivation(email, user.activationToken);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new EmailException();
  }
};

const getUsers = async (id) => {
  const users = await User.findAll({
    where: { id: { [Sequelize.Op.ne]: id } },
    attributes: { exclude: ['password', 'inactive'] },
    include: { model: Role, attributes: ['id', 'role'] }
  });

  return users;
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: { id: id, inactive: false },
    attributes: ['id', 'username', 'email', 'image'],
    include: [
      {
        model: Role,
        attributes: ['id', 'role']
      }
    ]
  });

  return user;
};

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const activate = async (token) => {
  const user = await User.findOne({
    where: { activationToken: token }
  });

  if (!user) {
    throw new InvalidTokenException();
  }

  user.inactive = false;
  user.activationToken = null;
  await user.save();
};

const update = async (body, id) => {
  const { username, newPassword, image } = body;

  const user = await User.findOne({ where: { id: id } });

  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
  }

  if (username) {
    user.username = username;
  }

  if (image) {
    if (user.image) {
      await FileService.deleteProfileImage(user.image);
    }
    user.image = await FileService.saveProfileImage(image);
  }

  await user.save();

  return { id: user.id, username: user.username, image: user.image };
};

module.exports = { save, findByEmail, activate, getUser, getUsers, update };
