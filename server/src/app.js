const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./config/env");

const routers = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const attachGuestSession = require("./middlewares/attachGuestSession");

const app = express();

app.use(
	cors({
		origin: env.clientOrigin,
		credentials: true,
	}),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
//
app.use(attachGuestSession());

// Routes
app.use("/api/v1", routers);

// Not found
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
