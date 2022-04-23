const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');
const FileAttachment = require('../file/FileAttachment');

const Model = Sequelize.Model;

class Item extends Model {}

Item.init(
  {
    name: { type: Sequelize.STRING, allowNull: false }
  },
  { sequelize, modelName: 'item' }
);

Item.hasOne(FileAttachment, { foreignKey: 'itemId', onDelete: 'cascade' });

module.exports = Item;
