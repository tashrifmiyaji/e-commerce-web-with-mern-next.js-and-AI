const express = require("express");
const {
	loginAdminController,
	getCurrentAdminController,
	logoutAdminController,
} = require("./admin.controller");
const loginAdminSchema = require("./admin.validation");
const validateRequest = require("../../middlewares/validateRequest");
const authenticateAdmin = require("../../middlewares/authenticateAdmin");

const router = express.Router();

router.post("/login", validateRequest(loginAdminSchema), loginAdminController);
router.get("/me", authenticateAdmin, getCurrentAdminController);
router.post("/logout", authenticateAdmin, logoutAdminController);

module.exports = router;