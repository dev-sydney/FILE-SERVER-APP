const catchAsyncError = require('../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');

const pool = require('./../model/database');
/**
 * Route handler that handles requests to the route responsible for add new
 * clients for a business
 */
exports.addClientContact = catchAsyncError(async (req, res, next) => {
  const obj = { ...req.body };
  obj.user_id = req.user.user_id;

  let columns = Object.keys(obj).join(',');

  let questionMarkPlaceholders = Object.values(obj)
    .map((el) => '?')
    .join(','); //Returns '?,?,?'

  const [insertCommandResults] = await pool.query(
    `INSERT INTO  Clients(${columns}) VALUES(${questionMarkPlaceholders})`,
    [...Object.values(obj)]
  );

  if (insertCommandResults.insertId) {
    res.status(201).json({
      resMessage: 'Client added successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble Adding the client, please try again.', 400)
    );
  }
});

/**
 * Route handler that handles requests to the route responsible for reading all the
 * clients of a business
 */
exports.getAllClientsContacts = catchAsyncError(async (req, res, next) => {
  const [queryResults] = await pool.query(
    `SELECT * FROM Clients WHERE user_id = ?`,
    [req.user.user_id]
  );

  res.status(200).json({
    clientContacts: queryResults,
  });
});
