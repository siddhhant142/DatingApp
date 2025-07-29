 import io from "socket.io-client";

export const createSocketConnection = () => {
  return io("http://localhost:3002", {
    withCredentials: true,
    transports: ['websocket', 'polling']
  });
};