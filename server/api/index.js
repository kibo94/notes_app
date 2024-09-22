// let notes = require('./db/data.json')
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const http = require('http').createServer(app);
// const https = require('https').createServer(app);
// const path = require('path');
// const { Server } = require("socket.io")

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"
import { Server } from "socket.io"

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
let notesData = [
  {
    title: "Note1",
    body: "This is a Note 1",
    author__name: "johndoe@gmail.com",
    id: 1,
    date: "12/08/2020",
    status: "published"
  },
  {
    title: "Sport Note",
    body: "This is a Note 2",
    author__name: "anna@gmailc.om",
    id: 2,
    date: "04/05/2020",
    status: "published"
  },
  {
    title: "Note3",
    body: "This is a Note 3",
    author__name: "nikola@gmail.com",
    id: 3,
    date: "09/07/2019",
    status: "published"
  },
  {
    title: "Note4",
    body: "This is a Note 4",
    author__name: "lmessi@gmail.com",
    id: 4,
    date: "10/03/2020",
    status: "published"
  },
  {
    title: "Note5",
    body: "This is a Note 5",
    author__name: "johny@gmail.com",
    id: 5,
    date: "12/11/2020",
    status: "drafts"
  }
]

console.log(notesData)
const users = [];
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
  socket.on("addNote", data => {
    socket.broadcast.emit("addNote", data);

  },)
  socket.on("deleteNote", data => {
    socket.broadcast.emit("deleteNote", data);

  })
  socket.on("updateNote", data => {
    console.log(data)
    socket.broadcast.emit("updateNote", data);

  })
  socket.on("addToDrafts", data => {
    socket.broadcast.emit("addToDrafts", data);
  });
  socket.on("publish", data => {
    socket.broadcast.emit("publish", data);
  });
  socket.on("mouse", data => {
    socket.broadcast.emit("mouse", data);
  })


})
app.use(cors())

app.get("api/notes", async (req, res) => {

  res.json({ notes: notesData });

})
app.post("api/notes", (req, res) => {
  notesData = req.body

  res.json({ notes: notesData })

})
app.post("api/users", (req, res) => {
  users.push(req.body)
  res.json({ users })
})
app.get("/users", (req, res) => {
  console.log(users)

  res.json({ users })
})
app.put("api/notes", (req, res) => {

  let note = req.body;
  notesData = notesData.map(d => {
    if (d.id === note.id) {
      d = note
      return d;
    }
    return d
  })

  res.json({ notes: notesData })

})
app.get("api/notes/filter", (req, res) => {
  let word = req.query
  console.log(word)
  // console.log(word)
  let cpyData = [...notesData]
  const filteredArr = cpyData.filter((note) => {
    var startsWith = new RegExp('^' + word.word);
    return startsWith.test(note.title.toLowerCase());
  })
  // console.log(filteredArr)
  // if(!word){
  //   return   res.json({notes:[]})
  // }
  res.json({ notes: filteredArr })

})

app.delete("api/notes/:id", (req, res) => {
  const filterNote = notesData.filter(note => note.id.toString() !== req.params.id.toString());
  notesData = filterNote;
  res.json({ notes: filterNote })

})



// http.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
// const isProduction = process.env.NODE_ENV === "production";
// console.log(isProduction)

// if (isProduction) {
//   // // Set static folder
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {

//     res.sendFile(
//       path.resolve(__dirname, "..", "client", "build", "index.html")
//     ); // index is in /server/src so 2 folders up
//   });
//   http.listen(process.env.PORT || 4000);

// } else {
//   http.listen(process.env.PORT || 4000);
// }
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {

});

// Export the Express app for Vercel
export default app;


