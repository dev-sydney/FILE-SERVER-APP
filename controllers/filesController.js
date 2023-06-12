const multer = require('multer');

const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');
const APIFeatures = require('../utils/APIFeatures');

const pool = require('./../model/database');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../view/public/files/`);
  },
  filename: (req, file, cb) => {
    const fileExt = file.mimetype.split('/')[1];

    //user-id-timestamp.jpg
    cb(null, `file-${Date.now()}.${fileExt}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.uploadFile = upload.single('file');

/**
 * Middle-ware responsible for saving the uploaded file meta data to the database
 */
exports.addNewFile = catchAsyncError(async (req, res, next) => {
  const obj = { ...req.body };

  //NOTE: Adding the neccesary fields
  obj.file_type = req.file.mimetype;
  obj.user_id = +obj.user_id;
  obj.file_name = req.file.filename;

  //TODO: Setting the column names for the SQL insert commmand from the req.body
  let columns = Object.keys(obj).join(',');

  let questionMarkPlaceholders = Object.values(obj)
    .map((el) => '?')
    .join(','); //Returns '?,?,?'

  const [insertCommandResults] = await pool.query(
    `INSERT INTO  Files(${columns}) VALUES(${questionMarkPlaceholders})`,
    [...Object.values(obj)]
  );

  if (insertCommandResults.insertId) {
    res.status(201).json({
      status: 'success',
      message: 'File added successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble Adding the file, please try again.', 400)
    );
  }
});

/**
 * Middle-ware function for getting meta-data about the files belonging to the logged in user
 */

exports.getFiles = catchAsyncError(async (req, res, next) => {
  req.query.user_id = req.user.user_id;

  let features = new APIFeatures(req.query, 'Files')
    .filter()
    .sort()
    .fieldLimit();

  let queryString = features.getSQLQueryString();
  let fieldValues = features.values;

  const [files] = await pool.query(queryString, fieldValues);

  res.status(200).json({
    status: 'success',
    files,
  });
});

/**
 * Middle-ware function for reading meta data about documents that belong to a specific business
 */
exports.getBusinessFiles = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if theres no user_id on the request parameter
  if (!req.params.user_id)
    return next(
      new GlobalAppError(
        'No business selected, please select one and try again',
        400
      )
    );

  const [queryResults] = await pool.query(
    `SELECT COUNT(FileShareToClients.file_id) AS times_shared,
    title, file_description, file_type, file_name, created_at
    FROM Files
    LEFT JOIN FileShareToClients ON Files.file_id = FileShareToClients.file_id
    WHERE Files.user_id = ?
    GROUP BY Files.file_id`,
    [+req.params.user_id]
  );

  res.status(200).json({
    status: 'success',
    businessFiles: queryResults,
  });
});

exports.updateDocument = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if theres no file_id in the request parameters
  if (!req.params.file_id)
    return next(
      new GlobalAppError(
        'No document or file selected, please pick one and try again',
        400
      )
    );
  const obj = { ...req.body };

  if (req.file) {
    obj.file_type = req.file.mimetype.split('/')[1];
    obj.file_name = req.file.filename;
  }
  //TODO: Get rid of fields that have an empty string value
  Object.keys(obj).forEach((fieldName) => {
    if (obj[fieldName] === '') delete obj[fieldName];
  });

  //TODO: Set the columns to be updates
  const columns = Object.keys(obj).join('=?,') + '=?';

  //TODO: Make the update
  const [updateCommandResult] = await pool.query(
    `UPDATE Files SET ${columns} WHERE file_id = ?`,
    [...Object.values(obj), +req.params.file_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(200).json({
      message: 'Document updated successfully',
    });
  }
});

/**
 * Middle ware function for handling delete requests
 */
exports.deleteDocument = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if theres no file_id in the request parameters
  if (!req.params.file_id)
    return next(
      new GlobalAppError(
        'No document or file selected, please pick one and try again',
        400
      )
    );

  const [updateCommandResult] = await pool.query(
    `UPDATE Files SET file_status = false WHERE file_id = ?`,
    [+req.params.file_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(204).json({
      message: 'Document deleted successfully',
    });
  }
});

exports.getOverview = catchAsyncError(async (req, res, next) => {
  const [overview] = await pool.query(`SELECT
  (SELECT COUNT(user_id) FROM Users WHERE privilege ='business') AS no_business,
  (SELECT COUNT(_id) FROM FileShareToClients) AS no_file_shares,
  (SELECT COUNT(file_id) FROM Files) AS no_files,
  (SELECT COUNT(client_id) FROM Clients) AS no_clients`);

  res.status(200).json({
    status: 'success',
    overview,
  });
});

exports.createFileDownload = catchAsyncError(async (req, res, next) => {
  if (!req.params.file_id)
    return next(
      new GlobalAppError(
        'No file was selected, please select one & try again',
        400
      )
    );

  const [insertCommandResults] = await pool.query(
    `INSERT INTO FileDownloads(file_id,user_id) VALUES (?,?)`,
    [+req.params.file_id, req.user.user_id]
  );

  if (insertCommandResults.insertId) {
    res.status(201).json({
      status: 'success',
      message: 'File downloaded successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble downloading the file, please try again.', 400)
    );
  }
});
