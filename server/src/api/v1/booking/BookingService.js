const Booking = require('../users/Booking');
const Item = require('../items/Items');
const FileAttachment = require('../file/FileAttachment');
const User = require('../users/User');

const getBooking = async (userId) => {
  const bookings = await Booking.findAll({
    where: { userId },
    attributes: ['date', 'total', 'status', 'id'],
    include: [
      {
        model: Item,
        attributes: ['id', 'name'],
        include: [FileAttachment]
        // include: { model: FileAttachment, attributes: ['id', 'filename'] }
      },
      {
        model: User,
        attributes: ['id', 'username']
      }
      // { model: FileAttachment, attributes: ['id', 'filename'] }
    ]
  });

  return bookings;
};

const update = async (bookingId, body) => {
  const { date, status } = body;
  const booking = await Booking.update(
    { date, status },
    { where: { id: bookingId }, returning: true }
  );

  return { ...booking[1] };
};

module.exports = { getBooking, update };
