const sequelize = require('../../../database/config');
const Sequelize = require('sequelize');

const Model = Sequelize.Model;

class FileAttachment extends Model {}

FileAttachment.init(
  {
    filename: {
      type: Sequelize.STRING
    },
    uploadDate: {
      type: Sequelize.DATE
    },
    fileType: {
      type: Sequelize.STRING
    }
  },
  { sequelize, modelName: 'file_attachment', timestamps: false }
);

module.exports = FileAttachment;
