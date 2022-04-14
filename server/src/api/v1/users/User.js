const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');
const Token = require('../auth/Token');

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    inactive: { type: Sequelize.BOOLEAN, defaultValue: true },
    activationToken: { type: Sequelize.STRING }
  },
  { sequelize, modelName: 'user' }
);

User.hasMany(Token, { onDelete: 'cascade', foreignKey: 'userId' });

module.exports = User;