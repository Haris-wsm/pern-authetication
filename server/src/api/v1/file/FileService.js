const path = require('path');
const fs = require('fs');
const config = require('config');
const FileType = require('file-type');
const { randomString } = require('../shared/generator');
const FileAttactment = require('../file/FileAttachment');

const { uploadDir, profileDir, attachmentDir } = config;
const profileFolder = path.join('.', uploadDir, profileDir);
const attachmentsFolder = path.join('.', uploadDir, attachmentDir);

const createFolders = () => {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  if (!fs.existsSync(profileFolder)) fs.mkdirSync(profileFolder);

  if (!fs.existsSync(attachmentsFolder)) fs.mkdirSync(attachmentsFolder);
};

const saveProfileImage = async (base64File) => {
  const filename = randomString(32);
  const filePath = path.join(profileFolder, filename);

  await fs.promises.writeFile(filePath, base64File, { encoding: 'base64' });
  return filename;
};

const isLessThan2MB = (buffer) => {
  return buffer.length < 2 * 1024 * 1024;
};

const isSupportedFileType = async (buffer) => {
  const type = await FileType.fromBuffer(buffer);

  return !type
    ? false
    : type.mime === 'image/png' || type.mime === 'image/jpeg'
    ? true
    : false;
};

const deleteProfileImage = async (filename) => {
  const filePath = path.join(profileFolder, filename);
  await fs.promises.unlink(filePath);
};

const saveAttachment = async (file) => {
  const type = await FileType.fromBuffer(file.buffer);

  let fileType;
  let filename = randomString(32);
  if (type) {
    fileType = type.mime;
    filename += `.${type.ext}`;
  }
  await fs.promises.writeFile(
    path.join(attachmentsFolder, filename),
    file.buffer
  );
  const savedAttachment = await FileAttactment.create({
    filename,
    uploadDate: new Date(),
    fileType: fileType
  });

  return { id: savedAttachment.id };
};

const associateFileToItem = async (attachmentId, itemId) => {
  const attachment = await FileAttactment.findOne({
    where: { id: attachmentId }
  });

  if (!attachment) return;

  if (attachment.itemId) return;
  attachment.itemId = itemId;
  await attachment.save();
};

const deleteFileBelongToItem = (filename) => {
  const filePath = path.join(attachmentsFolder, filename);
  try {
    fs.promises.access(filePath);
    fs.promises.unlink(filePath);
  } catch (error) {}
};

module.exports = {
  saveProfileImage,
  isLessThan2MB,
  isSupportedFileType,
  createFolders,
  deleteProfileImage,
  saveAttachment,
  associateFileToItem,
  deleteFileBelongToItem
};
