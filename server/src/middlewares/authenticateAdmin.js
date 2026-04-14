const jwt = require("jsonwebtoken");
const env = require("../config/env");
const AppError = require("../utils/AppError");
const Admin = require("../modules/admin/admin.model");

const authenticateAdmin = async (req, res, next) => {
	try {
		const token = req.cookies[env.cookieNames.adminToken];
		if (!token) {
			return next(new AppError("Unauthorized access", 401));
		}
		const decoded = jwt.verify(token, env.jwtSecret);
        const admin = await Admin.findById(decoded._adminId).select("-password");
        if (!admin) {
            return next(new AppError("Admin not found!", 401))
        }
        req.admin = admin;
        next()
	} catch (error) {
        next(new AppError("Invalid or expired token", 401));
    }
};

module.exports = authenticateAdmin;