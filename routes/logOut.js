const express = require("express");
const router = express.Router();
const logOutController = require("../controller/logOutController");

router.get("/", logOutController.handleLogout);

module.exports = router;
