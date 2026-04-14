const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const adminModel =
	mongoose.models.Admin || mongoose.model("Admin", adminSchema);

module.exports = adminModel;
