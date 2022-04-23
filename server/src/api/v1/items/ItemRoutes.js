const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const ItemService = require('./ItemServices');
const ValidationErrors = require('../errors/ValidationException');
const tokenAuthenticate = require('../middleware/tokenAuthenticate');
const restrictTo = require('../middleware/restrictTo');

router.get('/items', async (req, res, next) => {
  try {
    const items = await ItemService.getItems();
    res.send({ items });
  } catch (error) {
    next(error);
  }
});

router.get('/items/:id', async (req, res, next) => {
  try {
    const item = await ItemService.getItem(req.params.id);
    res.send({ item });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/items',
  // restrictTo('teacher', 'student'),
  check('name').notEmpty().withMessage('item_null'),
  async (req, res, next) => {
    // if (!req.role || !req.user) return next(new ForbiddenException());

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ValidationErrors(errors.array()));
    }

    try {
      const item = await ItemService.save(req.body);
      res.send({ item });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/items/:id/booking',
  check('total').notEmpty().withMessage('total_null'),
  tokenAuthenticate,
  restrictTo('student'),
  async (req, res, next) => {
    try {
      const booking = await ItemService.createBooking(
        req.body,
        req.user.id,
        req.params.id
      );
      res.send({ booking });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put(
  '/items/:id',
  check('name')
    .optional({ checkFalsy: true })
    .notEmpty()
    .withMessage('item_null'),

  async (req, res, next) => {
    try {
      const item = await ItemService.update(req.body, req.params.id);
      res.send({ item });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/items/:id', async (req, res, next) => {
  try {
    const item = await ItemService.deleteItem(req.params.id);
    res.send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
