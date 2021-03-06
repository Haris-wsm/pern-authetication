require('dotenv').config();

module.exports = {
  database: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: 'app_dev',
    host: 'localhost',
    dialect: 'postgres'
  },
  mail: {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.SMTP_ETHEREAL_USER,
      pass: process.env.SMTP_ETHEREAL_PASSWORD
    }
  },
  uploadDir: 'uploads-dev',
  profileDir: 'profile',
  attachmentDir: 'attachment'
};
