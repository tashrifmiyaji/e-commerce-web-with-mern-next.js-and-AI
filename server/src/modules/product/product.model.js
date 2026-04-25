const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	description: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    imagePublicId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const productModel = mongoose.models.Products || mongoose.model("Product", productSchema);

module.exports = productModel;
