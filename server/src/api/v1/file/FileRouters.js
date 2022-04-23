const express = require('express');
const router = express.Router();
const path = require('path');
const config = require('config');

const FileService = require('./FileService');
const multer = require('multer');
const FileSizeExeption = require('./FileSizeExeption');

const { uploadDir, attachmentDir } = config;

const attachmentsDirectory = path.join('.', uploadDir, attachmentDir);

const FIVE_MB = 5 * 1024 * 1024;
const upload = multer({ limits: FIVE_MB }).single('file');
// const upload = multer({ dest: attachmentsDirectory });

router.post('/items/attachments', (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new FileSizeExeption());
    }
    const attachment = await FileService.saveAttachment(req.file);
    res.send(attachment);
  });
});

module.exports = router;
