const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const ValidationErrors = require('../errors/ValidationException');
const UserService = require('./UserService');
const ForbiddenException = require('../errors/ForbiddenException');
const bcrypt = require('bcrypt');
const FileService = require('../file/FileService');

const tokenAuthenticate = require('../middleware/tokenAuthenticate');

const {
  validateUpdateChain
} = require('../middleware/users/validateRequestUpdate');
const restrictTo = require('../middleware/restrictTo');

router.post(
  '/users',
  check('username')
    .notEmpty()
    .withMessage('username_null')
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage('username_size'),
  check('role').notEmpty().withMessage('role_null'),
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

router.get(
  '/users',
  tokenAuthenticate,
  restrictTo('teacher', 'admin', 'student'),
  async (req, res, next) => {
    try {
      const users = await UserService.getUsers(req.user.id);
      res.send({ users });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/users/:id', async (req, res, next) => {
  if (!req.user || req.user.id != req.params.id) {
    return next(new ForbiddenException());
  }
  try {
    const user = await UserService.getUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/users/token/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    await UserService.activate(token);

    res.send({ message: req.t('account_activation_success') });
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id', validateUpdateChain(), async (req, res, next) => {
  if (!req.user || req.user.id != req.params.id) {
    return next(new ForbiddenException());
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ValidationErrors(errors.array()));
  }

  try {
    const user = await UserService.getUser(req.params.id);

    let match;

    if (req.body.password) {
      match = await bcrypt.compare(req.body.password, user.password);

      if (!match) return next(new ValidationErrors());
    }

    const updatedUser = await UserService.update(req.body, req.params.id);

    res.send({ user: updatedUser });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
