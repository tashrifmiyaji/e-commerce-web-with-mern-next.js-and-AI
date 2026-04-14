const AppError = require("../utils/AppError");

const validateRequest = (schema) => {
	return (req, res, next) => {
		const { error, value } = schema.validate(req.body, {
			abortEarly: false,
			stripUnknown: true,
		});
		if (error) {
			const errorMessages = error.details.map((item) => item.message);
			return next(new AppError("Validation failed", 400, errorMessages));
		}
		req.body = value;
		next();
	};
};

module.exports = validateRequest;
