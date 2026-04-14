const { Server } = require("socket.io");
const env = require("../config/env");
const { setIo } = require("../lib/socketStore");

const initializeSocketServer = (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: env.clientOrigin,
			credentials: true,
		},
	});

	setIo(io);

	//
	io.on("connection", (socket) => {
		console.log("User connected:", socket.id);
		//
		socket.on("support:join", ({ roomId }) => {
			if (!roomId) return;
			socket.join(roomId);
			console.log(`User ${socket.id} joined room ${roomId}`);
		});
		//
		socket.on("support:typing", ({ roomId, payload }) => {
			if (!roomId) return;
			console.log("Typing from:", payload.name);

			socket.to(roomId).emit("support:typing", payload);
		});
		//
		socket.on("support:message", ({ roomId, messageData }) => {
			if (!roomId) return;
			socket.to(roomId).emit("support:message", messageData);
		});
		io.on("disconnect", () => {
			console.log("User Disconnected!:", socket.id);
		});
	});
};

module.exports = initializeSocketServer;