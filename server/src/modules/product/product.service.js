const productModel = require("./product.model");
const slugify = require("../../utils/slugify");
const AppError = require("../../utils/AppError");
const {
	uploadToCloudinary,
	deleteFromCloudinary,
} = require("../../lib/cloudinaryUpload");
const {
	getPagination,
	getPaginationMeta,
} = require("../../utils/queryFeatures");

const createProductService = async (body, productImg) => {
	const slug = slugify(body.name);

	const isProductWithSameSlug = await productModel.findOne({ slug });
	if (isProductWithSameSlug)
		throw new AppError("Product already exists", 409);

	if (!productImg) throw new AppError("Product image is required!", 400);

	const uploadedProductImgResult = await uploadToCloudinary(
		productImg.buffer,
		"products",
	);

	const { secure_url, public_id } = uploadedProductImgResult;

	const product = await productModel.create({
		name: body.name,
		slug,
		price: body.price,
		description: body.description,
		imageUrl: secure_url,
		imagePublicId: public_id,
		category: body.category,
		stock: body.stock,
		isFeatured: body.isFeatured,
	});

	return product;
};

const getAllProductsService = async (queryObj) => {
	const filter = {};
	if (queryObj.category) filter.category = queryObj.category;
	if (queryObj.search)
		filter.name = { $regex: queryObj.search, $options: "i" };

	const { page, limit, skip } = getPagination(queryObj);

	let sort = { createdAt: -1 };

	if (queryObj.sort === "price_asc") {
		sort = { price: 1 };
	} else if (queryObj.sort === "price_desc") {
		sort = { price: -1 };
	} else if (queryObj.sort === "oldest") {
		sort = { createdAt: 1 };
	}

	const products = await productModel
		.find(filter)
		.sort(sort)
		.skip(skip)
		.limit(limit);
	const total = await productModel.countDocuments(filter);

	const meta = getPaginationMeta({ total, page, limit });

	return {
		products,
		meta,
	};
};

const getSingleProductService = async (slug) => {
	const product = await productModel.findOne({ slug });

	if (!product) throw new AppError("Product not found!", 404);

	return product;
};

const updateProductService = async (productId, body, productImg) => {
	const product = await productModel.findById(productId);

	if (!product) throw new AppError("Product not found!", 404);

	if (body.name) {
		const newSlug = slugify(body.name);
		const isDuplicateSlugExist = await productModel.findOne({
			slug: newSlug,
			_id: { $ne: productId },
		});

		if (isDuplicateSlugExist) {
			throw new AppError("Product already exists", 409);
		}
		product.slug = newSlug;
	}

	if (productImg) {
		if (product.imagePublicId) {
			await deleteFromCloudinary(product.imagePublicId);
		}

		const uploadedNewImgResult = await uploadToCloudinary(
			productImg.buffer,
			"products",
		);
		product.imageUrl = uploadedNewImgResult.secure_url;
		product.imagePublicId = uploadedNewImgResult.public_id;
	}

	const allowedFields = [
		"name",
		"price",
		"description",
		"category",
		"stock",
		"isFeatured",
	];

	allowedFields.forEach((key) => {
		if (body[key] !== undefined) {
			product[key] = body[key];
		}
	});

	await product.save();

	return product;
};

const deleteProductService = async (productId) => {
	const product = await productModel.findById(productId);

	if (!product) throw new AppError("Product not found!", 404);

	if (product.imagePublicId)
		await deleteFromCloudinary(product.imagePublicId);

	await product.deleteOne();
	return product;
};

module.exports = {
	createProductService,
	getAllProductsService,
	getSingleProductService,
	updateProductService,
	deleteProductService,
};
