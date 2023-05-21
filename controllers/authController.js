const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');
const pool = require('./../model/database');
/**
 * Fucntion responsible for signing the JWTs
 * @param {*} id
 * @returns
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * Sends auth tokens,cookies & some user-related data to the client
 * @param {*} user
 * @param {*} statusCode
 * @param {*} req
 * @param {*} res
 */
const createSendAuthToken = (user, statusCode, req, res) => {
  const token = signToken(user.user_id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('dds_jwt', token, cookieOptions);

  //NOTE: Clearing the irrelevant fields from the `user` object before sending it to the client
  user.user_password =
    user.password_confirm =
    user.password_reset_expires =
    user.reset_password_token =
      undefined;

  res.status(statusCode).json({
    status: `${statusCode}`.startsWith('2') ? 'success' : 'fail',
    token,
    user,
  });
};

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const [result] = await pool.query(
    'SELECT * FROM Users WHERE email_address=?',
    [req.body.emailAddress]
  );

  const user = result[0];

  //EDGE-CASE: if the password entered doesn't match what is in the DB or
  //there was no user found with the provided email
  if (!user || !(await bcrypt.compare(req.body.password, user.user_password))) {
    return next(
      new GlobalAppError('Invalid email or password,please try again', 404)
    );
  }

  createSendAuthToken(user, 200, req, res);
});

exports.signupUser = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if passwords entered don't match
  if (req.body.user_password !== req.body.password_confirm)
    return next(
      new GlobalAppError('Passwords do not match, please try again', 400)
    );

  const obj = { ...req.body };
  //TODO: Hash the passowrd
  obj.user_password = await bcrypt.hash(obj.user_password, 12);

  delete obj['password_confirm'];

  //TODO: Setting the column names for the SQL insert commmand from the req.body
  let columns = Object.keys(obj).join(',');

  let questionMarkPlaceholders = Object.values(obj)
    .map((el) => '?')
    .join(','); //Returns '?,?,?'

  const [insertCommandResults] = await pool.query(
    `INSERT INTO  Users(${columns}) VALUES(${questionMarkPlaceholders})`,
    [...Object.values(obj)]
  );

  const [queryResults] = await pool.query(
    `SELECT * FROM Users WHERE user_id = ?`,
    [insertCommandResults.insertId]
  );

  createSendAuthToken(queryResults[0], 201, req, res);
});
