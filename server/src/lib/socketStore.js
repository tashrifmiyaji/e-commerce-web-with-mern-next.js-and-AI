let io = null;

const setIo = (socketServer) => {
  io = socketServer;
};

const getIo = () => {
  return io;
};

module.exports = {
  setIo,
  getIo,
};
