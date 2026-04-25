const Joi = require("joi");

const createProductSchema = Joi.object({
	name: Joi.string().trim().required(),
	price: Joi.number().min(0).required(),
	description: Joi.string().trim().required(),
	category: string().trim().required(),
	stock: Joi.number().min(0).required(),
	isFeatured: Joi.boolean().optional(),
});

const updateProductSchema = Joi.object({
	name: Joi.string().trim().optional(),
	price: Joi.number().min(0).optional(),
	description: Joi.string().trim().optional(),
	category: string().trim().optional(),
	stock: Joi.number().min(0).optional(),
	isFeatured: Joi.boolean().optional(),
});


module.exports = { createProductSchema, updateProductSchema };
