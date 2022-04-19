const { check } = require('express-validator');
const FileService = require('../../file/FileService');

const validateUpdateChain = () => {
  return (
    check('username')
      .optional({ checkFalsy: true })
      .notEmpty()
      .withMessage('username_null')
      .bail()
      .isLength({ min: 4, max: 32 })
      .withMessage('username_size')
      .optional(),
    check('password')
      .optional({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('password_size')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/)
      .withMessage('password_pattern'),
    check('newPassword')
      .optional({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('password_size')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/)
      .withMessage('password_pattern'),
    check('image').custom(async (imageAsBase64String) => {
      if (!imageAsBase64String) return true;

      const buffer = Buffer.from(imageAsBase64String, 'base64');

      if (!FileService.isLessThan2MB(buffer)) {
        throw new Error('profile_image_size');
      }
      const supportType = await FileService.isSupportedFileType(buffer);
      if (!supportType) {
        throw Error('unsupported_image_file');
      }
      return true;
    })
  );
};

module.exports = { validateUpdateChain };
