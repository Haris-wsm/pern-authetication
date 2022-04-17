const TokenServices = require('../auth/TokenService');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.substring(7);

    try {
      const user = await TokenServices.verify(token);
      req.user = user;
    } catch (error) {}
  }

  next();
};
