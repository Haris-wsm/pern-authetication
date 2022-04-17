const { randomString } = require('../shared/generator');
const Token = require('./Token');
const Sequelize = require('sequelize');

const ONE_WEEK_IN_MILLIS = 1000 * 60 * 60 * 24 * 7;

const createToken = async (user) => {
  const token = randomString(32);

  await Token.create({ token, userId: user.id, lastUseAt: new Date() });

  return token;
};

const deleteToken = async (token) => {
  await Token.destroy({ where: { token } });
};

const verify = async (token) => {
  const oneWeekAgo = new Date(Date.now() - ONE_WEEK_IN_MILLIS);
  const tokenInDb = await Token.findOne({
    where: { token: token, lastUseAt: { [Sequelize.Op.gt]: oneWeekAgo } }
  });

  if (tokenInDb) {
    tokenInDb.lastUseAt = new Date();
    await tokenInDb.save();
  }

  const userId = tokenInDb.userId;

  return { id: userId };
};

module.exports = { createToken, deleteToken, verify };
