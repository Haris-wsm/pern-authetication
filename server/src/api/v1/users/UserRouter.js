const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const ValidationErrors = require('../errors/ValidationException');
const UserService = require('./UserService');

router.post(
  '/users',
  check('username')
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),
  check('email')
    .notEmpty()
    .withMessage('email_null')
    .bail()
    .isEmail()
    .withMessage('email_invalid')
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error('email_inuse');
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('password_null')
    .bail()
    .isLength({ min: 6 })
    .withMessage('password_size')
    .bail()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/)
    .withMessage('password_pattern'),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new ValidationErrors(errors.array()));

    try {
      await UserService.save(req.body);
      res.send({ message: req.t('user_create_success') });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/users/token/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    await UserService.activate(token);

    res.send({ message: req.t('account_activation_success') });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
