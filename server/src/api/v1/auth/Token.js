const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');

const Model = Sequelize.Model;

class Token extends Model {}

Token.init(
  {
    token: { type: Sequelize.STRING },
    lastUseAt: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize,
    modelName: 'token',
    timestamps: false
  }
);

module.exports = Token;
