const router = require("express").Router();

// file routes
const fileRoutes = require("./fileRoutes");

router.use("/file", fileRoutes);

module.exports = router;
