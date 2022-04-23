const TokenServices = require('../auth/TokenService');
const UserService = require('../users/UserService');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.substring(7);

    try {
      const { id } = await TokenServices.verify(token);
      const user = await UserService.getUser(id);

      if (user) req.user = user;
    } catch (error) {}
  }

  next();
};
