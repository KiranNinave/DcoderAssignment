const router = require("express").Router();

// file controller
const fileController = require("../controllers/fileController");

// request validator
const validator = require("../validators");

// route
// <---------------------- /file ---------------------->

router
  .route("/")
  .get(fileController.getFiles)
  .post(
    validator.validateBody(validator.schemas.fileValidator),
    fileController.addFile
  );

router
  .route("/:id")
  .get(fileController.getFileById)
  .put(
    validator.validateBody(validator.schemas.fileValidator),
    fileController.updateFileById
  );

module.exports = router;
