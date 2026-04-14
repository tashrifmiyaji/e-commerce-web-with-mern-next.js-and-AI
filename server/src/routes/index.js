const express = require("express");
const adminRoute = require("../modules/admin/admin.route");
const productRoute = require("../modules/product/product.route");
const orderRoute = require("../modules/order/order.route");
const chatRoute = require("../modules/chat/chat.route");

const router = express.Router();

router.get('/health',(req, res)=>{
    res.status(200).json({
        success: true,
        message: "Server is running..."
    })
})

router.use('/products', productRoutes);
router.use('/order', orderRoutes);
router.use('/chat', chatRoutes);
router.use('/admin/auth', adminRoutes);
router.use('/admin/products', adminProductsRoutes);
router.use('/admin/orders', adminOrderRoutes);
router.use('/admin/chats', adminChatsRoutes);

module.exports = router;