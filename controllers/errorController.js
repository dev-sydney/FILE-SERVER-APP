const GlobalAppError = require('./../utils/GlobalAppError');

/**
 * This function is handles situations where there's is a duplicate entry of emails or document titles
 * @param {*} errClone
 * @returns
 */
const handleDuplicateFields = (errClone) => {
  let errorMsg =
    errClone.sqlMessage.includes('email_address') ||
    errClone.sqlMessage.includes('client_email')
      ? 'An account with that email already exists'
      : 'Document title is already taken';

  return new GlobalAppError(errorMsg, 400);
};

const sendErrorsInDev = (err, req, res) => {
  //ERRORS FROM THE API
  // console.log(req.originalUrl);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};

const sendErrorsInProd = (err, req, res) => {
  //ERRORS FROM THE API

  if (req.originalUrl.startsWith('/api')) {
    //CHECK IF THE ERROR IS AN OPERATIONAL ERROR
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.errorMsg,
      });
    }

    //IF NOT AN OPERATIONAL ERROR THEN...
    console.error('ERROR❗❗❗', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something Went Very Wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorsInDev(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let errClone = { ...err };

    if (errClone.errno === 1062) {
      errClone = handleDuplicateFields(errClone);
    }
    sendErrorsInProd(errClone, req, res);
  }
};
