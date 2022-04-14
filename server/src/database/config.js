const Sequelize = require('sequelize');
const config = require('config');
require('pg').defaults.parseInt8 = true;

const dbConfig = config.get('database');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    logging: false
  }
);

module.exports = sequelize;
