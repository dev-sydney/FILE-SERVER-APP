const crypto = require('crypto');
const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');
const Email = require('./../utils/Email');

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
const createSendAuthToken = (
  user,
  statusCode,
  req,
  res,
  isForVerification = null
) => {
  const token = signToken(user.user_id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (req.secure || process.env.NODE_ENV === 'production')
    cookieOptions.secure = true;

  res.cookie('dds_jwt', token, cookieOptions);

  //NOTE: Clearing the irrelevant fields from the `user` object before sending it to the client
  user.user_password =
    user.password_confirm =
    user.password_reset_expires =
    user.reset_password_token =
      undefined;

  if (isForVerification) {
    res.status(200).json({
      token,
      message: "We've sent you a verification code, plase check your inbox",
    });
  } else {
    res.status(statusCode).json({
      status: `${statusCode}`.startsWith('2') ? 'success' : 'fail',
      token,
      user,
    });
  }
};

/**
 * Router handler for handling login requests
 */
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

/**
 * Router handler for handling signup requests
 */
exports.signupUser = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: if passwords entered don't match
  if (req.body.user_password !== req.body.password_confirm)
    return next(
      new GlobalAppError('Passwords do not match, please try again', 400)
    );

  const obj = { ...req.body };
  //TODO: Hash the passowrd
  obj.user_password = await bcrypt.hash(obj.user_password, 12);

  //TODO: Create the verification code of 6 digits
  const verificationCode = Math.floor(
    Math.random() * (999999 - 100000) + 100000
  ).toString();

  //TODO: Hash the verification code and add it to obj
  obj.verification_code = crypto
    .createHash('sha256')
    .update(verificationCode)
    .digest('hex');

  //TODO: set the expiration for the verification code
  let verificationCodeExipresAt = new Date(Date.now() + 10 * 60 * 1000); //user gets 10 mins to verify their account

  obj.verification_expires_at = verificationCodeExipresAt
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  delete obj['password_confirm'];

  //TODO: Setting the column names for the SQL insert commmand from the req.body
  let columns = Object.keys(obj).join(',');

  let questionMarkPlaceholders = Object.values(obj)
    .map((el) => '?')
    .join(','); //Returns '?,?,?'

  //TODO: Create the user in the database
  const [insertCommandResults] = await pool.query(
    `INSERT INTO  Users(${columns}) VALUES(${questionMarkPlaceholders})`,
    [...Object.values(obj)]
  );

  const verificationURL = `${req.protocol}://${req.get(
    'host'
  )}/account-verification`;

  const emailFrom = `Lizzy from DDS ${process.env.MAIL_FROM}`;

  try {
    await new Email(
      null,
      verificationURL,
      emailFrom,
      req.body.email_address
    ).sendAccountVerificationMail(verificationCode);

    res.status(201).json({
      message: "We've sent you a verification code, plase check your inbox",
    });
  } catch (err) {
    //EDGE-CASE: If there was an issue that occurred when sending the mail
    await pool.query(`DELETE FROM Users WHERE user_id = ?`, [
      insertCommandResults.insertId,
    ]);

    console.log(err);
    return next(
      new GlobalAppError('Error sending Email, please try again...', 500)
    );
  }
});

/**
 * Route handler for handling requests to forget passwords
 */
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const [queryResults] = await pool.query(
    `SELECT * FROM Users WHERE email_address = ? LIMIT 1`,
    [req.body.email_address]
  );

  const [user] = queryResults;

  if (!user)
    return next(
      new GlobalAppError('No user with this email exists, try again !', 404)
    );

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  let passwordResetExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  passwordResetExpiresAt = passwordResetExpiresAt
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  await pool.query(
    `UPDATE Users SET reset_password_token = ?,password_reset_expires = ? WHERE email_address = ? `,
    [resetPasswordToken, passwordResetExpiresAt, user.email_address]
  );

  //TODO: Set the URL to which the password would be reset
  const passwordResetURL = `${req.protocol}://${req.get(
    'host'
  )}/password-reset/${resetToken}`;

  const emailFrom = `Sydney from Send-File ${process.env.MAIL_FROM}`;

  try {
    await new Email(
      user,
      passwordResetURL,
      emailFrom,
      user.email_address
    ).sendPasswordResetMail();

    res.status(200).json({
      status: 'success',
      message: `We've sent you an email, please check your inbox`,
    });
  } catch (err) {
    //EDGE-CASE: IF THERES WAS AN ISSUE SENDING THE EMAIL
    await pool.query(
      `UPDATE Users SET reset_password_token=?,password_reset_expires=? WHERE email_address = ?`,
      [null, null, req.body.email_address]
    );

    console.log(err);
    return next(
      new GlobalAppError('Error sending Email, please try again...', 500)
    );
  }
});

/**
 * Route handler for resetting the users password
 */

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: If the reset token is absent
  if (!req.params.resetToken || req.params.resetToken === '')
    return next(
      new GlobalAppError('Password reset token missing,please try again', 400)
    );

  //EDGE-CASE: If the passwords don't match
  if (req.body.password !== req.body.password_confirm)
    return next(
      new GlobalAppError('Sorry,passwords do not match,please try again', 400)
    );

  let currentDate = new Date(Date.now())
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  const cryptedResetToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const [queryResults] = await pool.query(
    'SELECT * FROM Users WHERE reset_password_token=? AND password_reset_expires >= ?',
    [cryptedResetToken, currentDate]
  );
  const [user] = queryResults;
  if (!user)
    return next(new GlobalAppError('Invalid token or expired token', 400));

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const [updateCommandResult] = await pool.query(
    `UPDATE Users SET user_password =?,reset_password_token=?,password_reset_expires=? WHERE email_address =?`,
    [hashedPassword, null, null, user.email_address]
  );
  //EDGE-CASE: IF no changes were made
  if (updateCommandResult.changedRows === 0) {
    return next(
      new GlobalAppError(
        "Sorry, were'e a hard time resetting your password, please try again",
        400
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message:
      'Password reset successfully, you can now login with your new password.',
  });
});

/**
 * Middleware function for authenticating users
 */
exports.authenticateUser = catchAsyncError(async (req, res, next) => {
  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    authToken = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.dds_jwt) {
    authToken = req.cookies.dds_jwt;
  }

  //EDGE-CASE: If the auth token is missing from the request
  if (!authToken) {
    return next(
      new GlobalAppError(
        'You do not have access to this route! please try logging in again',
        401
      )
    );
  }

  const decodedPayload = await promisify(jwt.verify)(
    authToken,
    process.env.JWT_SECRET
  );

  const [queryResults] = await pool.query(
    `SELECT * FROM Users WHERE user_id = ?`,
    [decodedPayload.id]
  );

  const [stillExistingUser] = queryResults;

  //EDGE-CASE: Check the user still exists in the DB
  if (!stillExistingUser) {
    return next(
      new GlobalAppError('Invalid credentials or user no longer exists', 403)
    );
  }

  //EDGE-CASE: Check if the business account is not verified
  if (stillExistingUser.privilege === 'business') {
    if (
      stillExistingUser.is_verified === 0 &&
      Date.now() > new Date(stillExistingUser.verification_expires_at)
    )
      return next(
        new GlobalAppError(
          'Account not verified on time, please click here to resend a verification code',
          401
        )
      );
  }
  //TODO: attach the user data to the request body
  req.user = stillExistingUser;

  next();
});

/**
 * Middleware controls the authorization of actions on the API
 * @param  {...any} privileges arbitrary collection of authorized user roles
 * @returns middleware function that determines whether the user is authorized to make a request to certain routes
 */
exports.restrictAccessTo =
  (...privileges) =>
  (req, res, next) => {
    if (!privileges.includes(req.user.privilege)) {
      return next(
        new GlobalAppError(
          "You don't have permission to perform this action",
          401
        )
      );
    }
    next();
  };

/**
 * Route handler for verifying user accounts
 */
exports.verifyAccount = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE: If the verification code is missing
  if (!req.body.verification_code || req.body.verification_code === '')
    return next(
      new GlobalAppError('No verification code sent, please try again', 400)
    );

  let currentDate = new Date(Date.now())
    .toISOString()
    .split('T')
    .join(' ')
    .replace('Z', '');

  const cryptedVerificationCode = crypto
    .createHash('sha256')
    .update(req.body.verification_code)
    .digest('hex');

  const [queryResults] = await pool.query(
    'SELECT * FROM Users WHERE verification_code=? AND verification_expires_at>=?',
    [cryptedVerificationCode, currentDate]
  );
  const [user] = queryResults;

  if (user) {
    await pool.query(
      `UPDATE Users SET is_verified=?,verification_code=?
       WHERE user_id=? AND verification_code=?`,
      [true, null, user.user_id, cryptedVerificationCode]
    );

    createSendAuthToken(user, 200, req, res);
  } else {
    return next(
      new GlobalAppError(
        'Incorrect code or account verification time window passed.',
        400
      )
    );
  }
});

/**
 *Route handler for handling PATCH requests to the route for updating user passwords
 */
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  //EDGE-CASE:If the new password the doesn't match the its password confirm
  if (req.body.newPassword !== req.body.passwordConfirm)
    return next(
      new GlobalAppError(
        "password and confirm passwords, don't match, please try again",
        400
      )
    );

  const [queryResults] = await pool.query(
    `SELECT * FROM Users WHERE user_id = ?`,
    [req.user.user_id]
  );

  const [user] = queryResults;

  //EDGE-CASE:If the current password doesn't match what is in the database
  if (!(await bcrypt.compare(req.body.currentPassword, user.user_password))) {
    return next(
      new GlobalAppError('Current password is incorrect, please try again', 400)
    );
  }

  //TODO: Hash the new password and update the record with it
  const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

  const [updateCommandResult] = await pool.query(
    'UPDATE Users SET user_password = ? WHERE user_id = ?',
    [hashedPassword, user.user_id]
  );

  if (updateCommandResult.affectedRows > 0) {
    res.status(200).json({
      status: 'success',
      message: 'Password updated successfully',
    });
  } else {
    return next(
      new GlobalAppError(
        'Sorry, password update was not successful, please try again',
        400
      )
    );
  }
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('dds_jwt', 'cookieOverWritingText', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
  });
});
