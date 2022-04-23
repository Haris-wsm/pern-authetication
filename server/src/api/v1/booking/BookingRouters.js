const router = require('express').Router();
const restrictTo = require('../middleware/restrictTo');
const tokenAuthenticate = require('../middleware/tokenAuthenticate');
const BookingService = require('./BookingService');
const ForbiddenException = require('../errors/ForbiddenException');

router.get(
  '/bookings/:userId',
  tokenAuthenticate,
  restrictTo('student'),
  async (req, res, next) => {
    if (!req.role || req.params.userId != req.user.id)
      return next(new ForbiddenException());
    try {
      const bookings = await BookingService.getBooking(req.params.userId);
      res.send({ bookings });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/bookings/:id', tokenAuthenticate, async (req, res, next) => {
  try {
    const booking = await BookingService.update(req.params.id, req.body);
    res.send({ booking: booking['0'] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
