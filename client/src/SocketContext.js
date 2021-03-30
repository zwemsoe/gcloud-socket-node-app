import { createContext } from "react";
import ioClient from "socket.io-client";

export const socket = ioClient(
  process.env.NODE_ENV === "production"
    ? "https://gcloud-test-app-309202.wl.r.appspot.com/"
    : "http://localhost:5000",
  {}
);
export const SocketContext = createContext(socket);
