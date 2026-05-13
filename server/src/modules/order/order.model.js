import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
	{
		product: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		price: {
			type: Number,
			required: true,
			min: 0,
		},

		quantity: {
			type: Number,
			required: true,
			min: 1,
		},

		imageUrl: {
			type: String,
			required: true,
		},
	},
	{
		_id: false,
	},
);

const orderSchema = new mongoose.Schema(
	{
		customerName: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},

		phone: {
			type: String,
			required: true,
			trim: true,
		},

		address: {
			type: String,
			required: true,
			trim: true,
		},

		items: {
			type: [orderItemSchema],
			required: true,
		},

		subtotal: {
			type: Number,
			required: true,
			min: 0,
		},

		deliveryFee: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},

		total: {
			type: Number,
			required: true,
			min: 0,
		},

		paymentMethod: {
			type: String,
			required: true,
			enum: ["bKash", "Nagad"],
		},

		transactionId: {
			type: String,
			required: true,
			trim: true,
		},

		paymentStatus: {
			type: String,
			default: "submitted",
			enum: ["submitted", "verified", "rejected"],
		},

		orderStatus: {
			type: String,
			default: "new",
			enum: ["new", "processing", "completed", "cancelled"],
		},
	},
	{
		timestamps: true,
	},
);

const OrderModel =
	mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
