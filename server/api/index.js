import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//   origin: 'https://notes-app-bjk8.vercel.app', // Replace with your client URL
//   methods: ['GET', 'POST', 'OPTIONS'],
// }));

let notesData = [
  {
    title: "Note1",
    body: "This is a Note 1",
    author__name: "johndoe@gmail.com",
    id: 1,
    date: "12/08/2020",
    status: "published",
  },
  // ... (other notes)
];

const users = [];
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("addNote", (data) => {
    socket.broadcast.emit("addNote", data);
  });
  // ... (other socket events)
});

// API routes
app.get("/api/notes", (req, res) => {
  res.json({ notes: notesData });
});

app.post("/api/notes", (req, res) => {
  notesData = req.body;
  res.json({ notes: notesData });
});

// Other API routes (e.g., users, update notes) should also include the leading slash
app.post("/api/users", (req, res) => {
  users.push(req.body);
  res.json({ users });
});

app.get("/api/users", (req, res) => {
  res.json({ users });
});

// ... (remaining API routes)

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express app for Vercel
export default app;
