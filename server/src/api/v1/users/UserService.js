const bcrypt = require('bcrypt');
const sequelize = require('../../../database/config');
const { randomString } = require('../shared/generator');
const User = require('./User');
const EmailService = require('../email/EmailService');
const EmailException = require('../email/EmailException');
const InvalidTokenException = require('./InvalidTokenException');

const save = async (body) => {
  const { username, password, email } = body;
  const hash = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    password: hash,
    activationToken: randomString(16)
  };
  const transaction = await sequelize.transaction();
  await User.create(user, { transaction });
  try {
    await EmailService.sendAccountActivation(email, user.activationToken);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new EmailException();
  }
};

const getUser = async (id) => {
  const user = await User.findOne({
    where: { id: id, inactive: false },
    attributes: ['id', 'username', 'email', 'password']
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
  const { username, newPassword } = body;

  let newBody = {};

  if (newPassword) {
    const hash = await bcrypt.hash(newPassword, 10);
    newBody['password'] = hash;
  }

  if (username) {
    newBody['username'] = username;
  }

  const updatedUser = await User.update(newBody, {
    returning: true,
    where: { id },
    attributes: ['id', 'username', 'email']
  });

  return updatedUser;
};

module.exports = { save, findByEmail, activate, getUser, update };
