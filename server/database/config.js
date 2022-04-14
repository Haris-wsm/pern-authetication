const profiles = require('../config');

const dbConfig = {};

Object.keys(profiles).forEach((profile) => {
  dbConfig[profile] = { ...profiles[profile].database };
});
console.log(dbConfig);

module.exports = dbConfig;
