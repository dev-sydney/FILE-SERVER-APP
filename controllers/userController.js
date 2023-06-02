const multer = require('multer');
const sharp = require('sharp');

const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');
const pool = require('./../model/database');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, currentFile, cb) => {
  if (currentFile.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new GlobalAppError(
        'Only image files accepted for profiles,please try again with an image.',
        400
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single('photo');

/**
 * Middleware function for resizing and compressing image files meant to be used as
 * profile picture for user accounts
 */
exports.resizeAccountPhoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.user_id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`view/public/img/users/${req.file.filename}`);

  next();
});

exports.updateAccount = catchAsyncError(async (req, res, next) => {
  const obj = { ...req.body };

  if ('privilege' in obj) delete obj['privilege'];

  //TODO: Get rid of fields that have an empty string value
  Object.keys(obj).forEach((fieldName) => {
    if (obj[fieldName] === '') delete obj[fieldName];
  });

  if (req.file) obj.photo = req.file.filename;

  //TODO: Set the columns to be updated
  const columns = Object.keys(obj).join('=?,') + '=?';

  //TODO: Perform the update
  const [updateCommandResult] = await pool.query(
    `UPDATE Users SET ${columns} WHERE user_id = ?`,
    [...Object.values(obj), +req.user.user_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(200).json({
      message: 'Account updated successfully',
    });
  } else {
    return next(
      new GlobalAppError('Could not update account, please try again', 400)
    );
  }
});