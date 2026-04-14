const Joi = require("joi");

const loginAdminSchema = Joi.object({
	email: Joi.string().email().lowercase().trim().required(),
	password: Joi.string().min(6).required(),
});

module.exports = loginAdminSchema;
