const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');

const Model = Sequelize.Model;

class Role extends Model {}

Role.init(
  {
    role: {
      type: Sequelize.ENUM('admin', 'teacher', 'student'),
      defaultValue: 'student'
    }
  },
  { sequelize, modelName: 'role', timestamps: false }
);

module.exports = Role;
