import io from "socket.io-client";

// export const path = "https://notes-app-api-amber.vercel.app";
export const path = io('https://notes-app-bjk8.vercel.app', { withCredentials: true, transports: ['websocket', 'polling'] })