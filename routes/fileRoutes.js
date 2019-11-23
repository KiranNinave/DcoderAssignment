const router = require("express").Router();

// file controller
const fileController = require("../controllers/fileController");

// route
// <---------------------- /file ---------------------->

router
  .route("/")
  .get(fileController.getFiles)
  .post(fileController.addFile);

module.exports = router;
