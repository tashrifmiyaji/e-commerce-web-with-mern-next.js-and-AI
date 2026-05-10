const {
	createProductService,
	getAllProductsService,
	getSingleProductService,
	updateProductService,
	deleteProductService,
} = require("./product.service");

const createProductController = async (req, res) => {
	const body = req.body;
	const file = req.file;

	const product = await createProductService(body, file);

	return res.status(201).json({
		success: true,
		message: "Product created successfully!",
		data: product,
	});
};

const getAllProductsController = async (req, res) => {
	const query = req.query;
	const { products, meta } = await getAllProductsService(query);

	return res.status(200).json({
		success: true,
		message: "Products fetched successfully",
		data: products,
		meta,
	});
};

const getSingleProductController = async (req, res) => {
	const slug = req.params.slug;

	const product = await getSingleProductService(slug);

	return res.status(200).json({
		success: true,
		message: "Product fetched successfully",
		data: product,
	});
};

const updateProductController = async (req, res) => {
	const productId = req.params.id;
	const body = req.body;
	const file = req.file;

	const updatedProduct = await updateProductService(productId, body, file);

	return res.status(200).json({
		success: true,
		message: "Product update successfully!",
		data: updatedProduct,
	});
};
const deleteProductController = async (req, res) => {
	const productId = req.params.id;

	const deletedProduct = await deleteProductService(productId);

	return res.status(200).json({
		success: true,
		message: "Product delete successfully",
		data: deletedProduct,
	});
};

module.exports = {
	createProductController,
	getAllProductsController,
	getSingleProductController,
	updateProductController,
	deleteProductController,
};
