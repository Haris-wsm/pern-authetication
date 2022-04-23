const Sequelize = require('sequelize');
const sequelize = require('../../../database/config');

const Model = Sequelize.Model;

class Booking extends Model {}

Booking.init(
  {
    date: { type: Sequelize.DATE },
    recieve: { type: Sequelize.BOOLEAN, defaultValue: false },
    total: { type: Sequelize.INTEGER },
    status: {
      type: Sequelize.ENUM('pennding', 'submit', 'reject'),
      defaultValue: 'pennding'
    }
  },
  { sequelize, modelName: 'booking' }
);

module.exports = Booking;
