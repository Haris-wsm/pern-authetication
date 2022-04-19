const path = require('path');
const fs = require('fs');
const config = require('config');
const FileType = require('file-type');
const { randomString } = require('../shared/generator');
const FileAttactment = require('../file/FileAttachment');

const { uploadDir, profileDir } = config;
const profileFolder = path.join('.', uploadDir, profileDir);

const createFolders = () => {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  if (!fs.existsSync(profileFolder)) fs.mkdirSync(profileFolder);

  // if (!fs.existsSync(attachmentsFolder)) fs.mkdirSync(attachmentsFolder);
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

module.exports = {
  saveProfileImage,
  isLessThan2MB,
  isSupportedFileType,
  createFolders,
  deleteProfileImage
};
