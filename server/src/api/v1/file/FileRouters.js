const router = require('express').Router();
const multer = require('multer');
const FileSizeExeption = require('./FileSizeExeption');

const FIVE_MB = 5 * 1024 * 1024;

const upload = multer({ limits: FIVE_MB }).single('file');

router.post('/users/attachment', async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return next(new FileSizeExeption());
    }
    const attachment = await FileService.saveProfileImage(req.file);
    res.send(attachment);
  });
});
