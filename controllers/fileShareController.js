const catchAsyncError = require('./../utils/catchAsyncError');
const GlobalAppError = require('./../utils/GlobalAppError');
const Email = require('./../utils/Email');

const pool = require('./../model/database');

/**
 * This function dynamically generates the field values for the SQL insert command.
 * When inserting into the `FileShareToClients` table
 * @param {Array} fileIds The `primary key` field values of the files shared
 * @param {Array} clientIds The `primary key` field values of the clients, to whom the files were shared to
 * @param {Number} user_id The `primary key` field value of the business/company sharing the files
 * @returns The query string for the SQL insert command.
 */
const getStringForInsertCommand = (
  fileIds = Array,
  clientIds = Array,
  user_id = Number
) => {
  let fieldValues = '';
  //INSERT INTO FileShareToClients(file_id,user_id,client_id) VALUES(),();

  //NOTE: If the number of files shared is larger than the number of clients they're being shared to
  if (fileIds.length > clientIds.length) {
    for (let i = 0; i < fileIds.length; i++) {
      for (let j = 0; j < clientIds.length; j++) {
        if (j === fileIds.length) break;
        fieldValues += `(${fileIds[i]},${clientIds[j]},${user_id}),`;
      }
    }
  } else {
    for (let i = 0; i < clientIds.length; i++) {
      for (let j = 0; j < fileIds.length; j++) {
        if (j === clientIds.length) break;
        fieldValues += `(${fileIds[j]},${clientIds[i]},${user_id}),`;
      }
    }
  }
  return `INSERT INTO FileShareToClients(file_id,client_id,user_id) VALUES${fieldValues.slice(
    0,
    -1
  )}`;
};
/**
 * This middle ware function checks the query paramters in the route,
 * to ensure that the neccessary parameter values are present.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
exports.checkQueryParamsValidility = (req, res, next) => {
  if (req.query.client_ids.trim() === '' || !req.query.client_ids)
    return next(new GlobalAppError('No client contact was selected'), 400);

  if (/[A-Za-z]/.test(req.query.client_ids))
    return next(new GlobalAppError('Invalid client contact entry', 400));

  if (!req.query.fileName || req.query.fileName === '')
    return next(
      new GlobalAppError(
        'No file was selected, please select a file and try again',
        400
      )
    );

  next();
};

/**
 * The middleware function handles the logic for sharing the files to the businesses clients
 */
exports.shareFilesToEmails = catchAsyncError(async (req, res, next) => {
  //TODO: Create the query string to get the clients info based off the client ids gotten from req.query
  let queryStr =
    req.query.client_ids === '*'
      ? 'SELECT client_email,client_id FROM Clients WHERE user_id = ?'
      : `SELECT client_email,client_id FROM Clients WHERE user_id = ? AND client_id IN (${req.query.client_ids})`;

  const [clientsContacts] = await pool.query(queryStr, [req.user.user_id]);

  //TODO: prepare the clients emails to which they will be mailed
  let clientsEmails = clientsContacts.map((el) => el.client_email);

  //TODO: Prepare the file attachments to be shared in the email
  let fileAttachments = req.query.fileName.split(',').map((el) => ({
    path: `${__dirname}/../view/public/files/${el}`,
    filename: el,
  }));

  //TODO: Send the email to the client
  try {
    await new Email(
      null,
      null,
      req.user.user_name,
      clientsEmails
    ).sendFileToClients(req.body.subject, req.body.caption, fileAttachments);

    //TODO: After sending the mails, create the records in the DB.
    const questionMarkPlaceholders = req.query.fileName
      .split(',')
      .map((el) => '?')
      .join(','); //--> '?,?,?'

    const [filesSelected] = await pool.query(
      `SELECT file_id FROM Files WHERE file_name IN (${questionMarkPlaceholders})`,
      req.query.fileName.split(',')
    );

    const fileIds = filesSelected.map((el) => el.file_id); //An array of file ids of the files that were shared
    const clientIds = clientsContacts.map((el) => el.client_id); //An array of client ids of the clients that recieved the shared files

    //TODO: Generate the insert command
    const insertCommandString = getStringForInsertCommand(
      fileIds,
      clientIds,
      req.user.user_id
    );
    const [insertCommandResults] = await pool.query(insertCommandString);

    // console.log(insertCommandResults.info);

    res.status(200).json({
      status: 'success',
      message: 'Documents shared successfully',
    });
  } catch (err) {
    console.error('FILE SHARING ERROR❗❗❗', err);

    return next(
      new GlobalAppError(
        'There was an issue when sharing the files, please try again',
        400
      )
    );
  }
});
