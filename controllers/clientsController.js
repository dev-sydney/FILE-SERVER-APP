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
    `SELECT * FROM Clients WHERE user_id = ? AND client_status = 1`,
    [req.user.user_id]
  );

  res.status(200).json({
    clientContacts: queryResults,
  });
});

/**
 * route handler for handling the updating client resources
 */
exports.updateClientContact = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: If the client_id is absent from the req.params or is an empty string
  if (!req.params.client_id || req.params.client_id === '')
    return next(
      new GlobalAppError(
        'No contact was selected,please select one and try again',
        400
      )
    );

  const obj = { ...req.body };

  //TODO: Get rid of fields that have an empty string value
  Object.keys(obj).forEach((curField) => {
    if (obj[curField] === '') delete obj[curField];
  });
  //TODO: Set the columns to be updated
  const columns = Object.keys(obj).join('=?,') + '=?';

  //TODO: Make the update
  const [updateCommandResult] = await pool.query(
    `UPDATE Clients SET ${columns} WHERE client_id = ?`,
    [...Object.values(obj), +req.params.client_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(200).json({
      message: 'Contact updated successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble updating the contact, please try again', 400)
    );
  }
});
/**
 * route handler for handling the deleting client resources
 */
exports.deleteClientContact = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: If the client_id is absent from the req.params or is an empty string
  if (!req.params.client_id || req.params.client_id === '')
    return next(
      new GlobalAppError(
        'No contact was selected,please select one and try again',
        400
      )
    );

  const [updateCommandResult] = await pool.query(
    `UPDATE Clients SET client_status = false WHERE client_id = ?`,
    [+req.params.client_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(204).json({
      message: 'Contact deleted successfully',
    });
  } else {
    return next(
      new GlobalAppError('Trouble deleting the contact, please try again', 400)
    );
  }
});
