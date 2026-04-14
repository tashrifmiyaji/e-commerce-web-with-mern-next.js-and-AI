const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
const initializeSocketServer = require("./sockets/index");

const startServer = async () => {
	try {
		await connectDB();
		const server = http.createServer(app);
		initializeSocketServer(server);
		server.listen(env.port, () => {
			console.log(`Server running on http://localhost:${env.port}`);
		});
	} catch (error) {
		console.error("Server startup error:", error);
		process.exit(1);
	}
};

startServer();
