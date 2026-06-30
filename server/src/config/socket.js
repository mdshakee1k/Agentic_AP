let io;

function initSocket(server, corsOrigin) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: { origin: corsOrigin, credentials: true }
  });

  io.on("connection", (socket) => {
    socket.on("execution:subscribe", (executionId) => {
      socket.join(`execution:${executionId}`);
    });
  });

  return io;
}

function emitExecutionEvent(executionId, event) {
  if (io && executionId) {
    io.to(`execution:${executionId}`).emit("execution:event", event);
  }
}

module.exports = { initSocket, emitExecutionEvent };
