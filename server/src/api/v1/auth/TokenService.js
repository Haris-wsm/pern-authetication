const { randomString } = require('../shared/generator');
const Token = require('./Token');

const createToken = async (user) => {
  const token = randomString(32);

  await Token.create({ token, userId: user.id, lastUseAt: new Date() });

  return token;
};

const deleteToken = async (token) => {
  await Token.destroy({ where: { token } });
};

module.exports = { createToken, deleteToken };
