const multer = require('multer');

const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');

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
  obj.file_type = req.file.mimetype.split('/')[1];
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
      resMessage: 'File added successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble Adding the file, please try again.', 400)
    );
  }
});

/**
 * This middleware function checks if theres a query paramter for the title and file_description
 */
exports.checkTitleDescriptionParameters = (req, res, next) => {
  let queryStr;

  //EDGE-CASE: if theres query parameter for the file_description or the title
  if (req.query.title || req.query.file_description) {
    queryStr = 'SELECT * FROM Files WHERE user_id = ? AND ';

    //EDGE-CASE: if parameter contains only one of the two fields
    if (Object.keys(req.query).length === 1) {
      Object.keys(req.query).forEach((curField) => {
        queryStr = queryStr.concat(
          `${curField} LIKE '%${req.query[curField]}%'`
        );
      });
    }

    //EDGE-CASE: if the paramter includes both fields
    if (Object.keys(req.query).length > 1) {
      Object.keys(req.query).forEach((curField) => {
        queryStr = queryStr.concat(
          `${curField} LIKE '%${req.query[curField]}%' OR `
        );
      });

      queryStr = queryStr.slice(0, -3); //NOTE: This removes the last 3 characters in the query string - 'OR '
    }
  }

  req.queryString = queryStr;
  next();
};

/**
 * Middle-ware function for reading file meta data from the database for the feed page
 */
exports.getFilesForFeedPage = catchAsyncError(async (req, res, next) => {
  let queryStr = req.queryString
    ? req.queryString
    : `SELECT * FROM Files WHERE user_id = ? AND file_status = 1 ORDER BY created_at DESC`;

  //TODO: Perform the query as a business account
  const [queryResults] = await pool.query(queryStr, [req.user.user_id]);

  res.status(200).json({
    userFiles: queryResults,
  });
});

/**
 * Middle-ware function for reading meta data about documents that belong to a specific business
 */
exports.getFiles = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if theres no user_id on the request parameter
  if (!req.params.user_id)
    return next(
      new GlobalAppError(
        'No business selected, please select one and try again',
        400
      )
    );

  const [queryResults] = await pool.query(
    `SELECT COUNT(FileShareToClients._id) AS no_shares,
  title, file_description, file_type, file_name, created_at
  FROM FileShareToClients
  RIGHT JOIN Files ON FileShareToClients.file_id = Files.file_id
  WHERE Files.user_id = ?
  GROUP BY FileShareToClients.file_id`,
    [+req.params.user_id]
  );

  res.status(200).json({
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
