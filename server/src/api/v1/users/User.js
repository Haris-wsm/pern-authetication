const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');
const Token = require('../auth/Token');
const FileAttachment = require('../file/FileAttachment');
const Role = require('./Role');

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    inactive: { type: Sequelize.BOOLEAN, defaultValue: true },
    activationToken: { type: Sequelize.STRING },
    image: { type: Sequelize.STRING }
  },
  { sequelize, modelName: 'user' }
);

User.hasMany(Token, { foreignKey: 'userId', onDelete: 'cascade' });
User.hasOne(FileAttachment, { foreignKey: 'userId', onDelete: 'cascade' });

User.belongsToMany(Role, {
  through: 'users_roles',
  foreignKey: 'userId'
});

Role.belongsToMany(User, {
  through: 'users_roles',
  foreignKey: 'roleId'
});

module.exports = User;
