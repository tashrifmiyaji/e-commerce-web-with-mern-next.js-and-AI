const express = require("express");
const multer = require("multer");
const product = require("./product.controller");
const {
	createProductSchema,
	updateProductSchema,
} = require("./product.validation");
const validateRequest = require("../../middlewares/validateRequest");
const authenticateAdmin = require("../../middlewares/authenticateAdmin");

const router = express.Router();

const multerStorage = multer.memoryStorage();
const upload = multer({
	storage: multerStorage,
});
const uploadSingleImage = upload.single("image");

router.get("/", product.getAllProductsController);
router.get("/:slug", product.getSingleProductController);
router.post(
	"/",
	authenticateAdmin,
	uploadSingleImage,
	validateRequest(createProductSchema),
	product.createProductController,
);
router.patch(
	"/:id",
	authenticateAdmin,
	uploadSingleImage,
	validateRequest(updateProductSchema),
	product.updateProductController,
);
router.delete("/:id", authenticateAdmin, product.deleteProductController);

module.exports = router;
