const express = require("express");
const router = express.Router();
const usersController = require("../../controller/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").get(usersController.getAllUser);

module.exports = router;
