const express = require('express');
const authController = require('./../controllers/authController');
const filesController = require('./../controllers/filesController');

const router = express.Router();

router.use(authController.authenticateUser);

router
  .route('/')
  .post(
    authController.restrictAccessTo('admin'),
    filesController.uploadFile,
    filesController.addNewFile
  )
  .get(
    authController.restrictAccessTo('business'),
    filesController.getFilesForFeedPage
  );

router
  .route('/:file_id')
  .patch(filesController.uploadFile, filesController.updateDocument)
  .delete(filesController.deleteDocument);

router
  .route('/businesses/:user_id')
  .get(authController.restrictAccessTo('admin'), filesController.getFiles);

module.exports = router;
