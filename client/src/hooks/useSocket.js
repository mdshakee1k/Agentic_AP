import { useEffect } from "react";
import { io } from "socket.io-client";

export function useExecutionSocket(executionId, onEvent) {
  useEffect(() => {
    if (!executionId) return undefined;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");
    socket.emit("execution:subscribe", executionId);
    socket.on("execution:event", onEvent);
    return () => socket.disconnect();
  }, [executionId, onEvent]);
}
