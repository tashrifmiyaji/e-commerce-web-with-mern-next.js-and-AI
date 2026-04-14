const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const adminModel = require("./admin.model");
const AppError = require("../../utils/AppError");

const loginAdminService = async (email, password) => {
	const admin = await adminModel.findOne({ email });
	if (!admin) {
		throw new AppError("Invalid email or password", 401);
	}

	const rightPassword = await bcrypt.compare(password, admin.password);
	if (!rightPassword) {
		throw new AppError("Invalid email or Password", 401);
	}

	const token = jwt.sign({ adminId: admin._id }, env.jwtSecret, {
		expiresIn: env.jwtExpiresIn,
	});

	const adminObj = admin.toObject();
	delete adminObj.password;

	return {
		admin: adminObj,
		token,
	};
};

const getCurrentAdminService = async (adminId) => {
	const admin = await adminModel.findById(adminId).select("-password");

	if (!admin) {
		throw new AppError("Admin not found", 404);
	}

	return { admin };
};

module.exports = { loginAdminService, getCurrentAdminService };
