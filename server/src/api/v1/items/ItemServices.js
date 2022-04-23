const Item = require('./Items');
const FileAttachment = require('../file/FileAttachment');
const FileService = require('../file/FileService');
const Booking = require('../users/Booking');

const save = async (body) => {
  const { name, fileId } = body;
  const item = await Item.create({ name });

  if (fileId) {
    await FileService.associateFileToItem(fileId, item.id);
  }

  return item;
};

const getItems = async () => {
  const items = await Item.findAll({ include: { model: FileAttachment } });

  return items;
};

const getItem = async (id) => {
  const item = await Item.findOne({
    where: { id },
    include: { model: FileAttachment }
  });

  return item;
};

const createBooking = async (body, userId, itemId) => {
  const { total } = body;
  const newBody = { date: new Date(), userId, itemId, total: Number(total) };

  const booking = await Booking.create(newBody);

  return booking;
};

const update = async (body, id) => {
  const { name, file } = body;

  // const item = await Item.findOne({
  //   where: { id },
  //   include: { model: FileAttachment }
  // });

  const item = await Item.update({ name }, { where: { id } });
  return { id, name };
};

const deleteItem = async (id) => {
  const itemToBedelete = await Item.findByPk(id, {
    include: { model: FileAttachment }
  });

  if (itemToBedelete.file_attachment !== null) {
    await FileService.deleteFileBelongToItem(
      itemToBedelete.file_attachment.filename
    );
  }

  await itemToBedelete.destroy();
};

module.exports = { getItems, getItem, createBooking, save, update, deleteItem };
