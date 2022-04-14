const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const UserService = require('../users/UserService');
const bcrypt = require('bcrypt');
const ForbiddenException = require('../errors/ForbiddenException');
const TokenService = require('./TokenService');

router.post(
  '/auth',
  check('email')
    .notEmpty()
    .withMessage('email_null')
    .bail()
    .isEmail('email_invalid'),
  check('password').notEmpty().withMessage('password_null'),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new AuthenticationException());
    }

    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);

    if (!user) {
      return next(new AuthenticationException());
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return next(new AuthenticationException());
    }

    if (user.inactive) {
      return next(new ForbiddenException());
    }

    const token = await TokenService.createToken(user);
    res.send({
      id: user.id,
      username: user.username,
      image: user.image,
      token
    });
  }
);

module.exports = router;