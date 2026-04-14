const dotenv = require("dotenv");

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",

  mongodbUri:
    process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  adminName: process.env.ADMIN_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  cookieNames: {
    adminToken: process.env.ADMIN_TOKEN,
    guestSession: process.env.GUEST_SESSION,
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    allowMockUploads: process.env.ALLOW_MOCK_UPLOADS === "true",
  },

  openai: {
    apiKey: process.env.OPENAI_API_KEY || "",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  },

  store: {
    name: process.env.STORE_NAME || "AI Powered Store",
    supportPhone: process.env.STORE_SUPPORT_PHONE,
    supportEmail: process.env.STORE_SUPPORT_EMAIL,
    bkashNumber: process.env.STORE_BKASH_NUMBER,
    nagadNumber: process.env.STORE_NAGAD_NUMBER,
    deliveryFee: Number(process.env.DELIVERY_FEE),
  },
};

module.exports = env;
