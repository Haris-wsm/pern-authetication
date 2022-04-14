require('dotenv').config();

module.exports = {
  database: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'app_test',
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
  mail: {
    host: 'localhost',
    port: Math.floor(Math.random() * 2000) + 10000,
    tls: {
      rejectUnauthorized: false
    }
  }
};
