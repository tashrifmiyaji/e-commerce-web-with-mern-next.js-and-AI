const bcrypt = require("bcrypt");
const env = require("../src/config/env");
const connectDB = require("../src/config/db");
const AdminModel = require("../src/modules/admin/admin.model");

const seedAdmin = async () => {
	try {
		await connectDB();
		const isExistAdmin = await AdminModel.findOne({
			email: env.adminEmail,
		});

		if (isExistAdmin) {
			console.log("Admin already exists!");
			process.exit(0);
		}

		const hashedAdminPassword = await bcrypt.hash(env.adminPassword, 10);

		const admin = await new AdminModel.create({
			name: env.adminName,
			email: env.adminEmail,
			password: hashedAdminPassword,
		});

		console.log("Admin created successfully");
		process.exit(0);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

seedAdmin();
