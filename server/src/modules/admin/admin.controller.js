const {
	loginAdminService,
	getCurrentAdminService,
} = require("./admin.service");
const { adminCookieOptions } = require("../../config/cookies");
const env = require("../../config/env");

const loginAdminController = async (req, res) => {
	const { email, password } = req.body;
	const { admin, token } = await loginAdminService(email, password);

	res.cookie(env.cookieNames.adminToken, token, adminCookieOptions);

	return res.status(200).json({
		success: true,
		message: "Admin logged in successfully",
		data: admin,
	});
};

const getCurrentAdminController = async (req, res) => {
	const adminId = req.admin._id;
	const { admin } = await getCurrentAdminService(adminId);

	return res.status(200).json({
		success: true,
		message: "Current admin fetched successfully",
		data: admin,
	});
};

const logoutAdminController = (req, res) => {
	res.clearCookie(env.cookieNames.adminToken, adminCookieOptions);
	return res.status(200).json({
		success: true,
		message: "Admin logged out successfully",
	});
};

module.exports = {
  loginAdminController,
  getCurrentAdminController,
  logoutAdminController,
};