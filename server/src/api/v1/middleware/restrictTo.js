const AuthenticationException = require('../auth/AuthenticationException');

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return next(new AuthenticationException());

    const role = req.user.roles[0].role;
    if (roles.includes(role)) {
      req.role = role;
    }
    next();
  };
};
