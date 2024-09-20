let notes = require('./db/data.json')
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
dotenv.config();
app.use(cors());
app.use(express.json());
let notesData = [...notes]
const users = [];
io.on('connection', (socket) => {
  socket.on("addNote", data => {
    socket.broadcast.emit("addNote", data);

  }, { transports: ['websocket'] })
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

app.get("/notes", (req, res) => {
  res.json({ notes: notesData })
})
app.post("/notes", (req, res) => {
  notesData = req.body

  res.json({ notes: notesData })

})
app.post("/users", (req, res) => {
  users.push(req.body)
  res.json({ users })
})
app.get("/users", (req, res) => {
  console.log(users)

  res.json({ users })
})
app.put("/notes", (req, res) => {

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
app.get("/notes/filter", (req, res) => {
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

app.delete("/notes/:id", (req, res) => {
  const filterNote = notesData.filter(note => note.id.toString() !== req.params.id.toString());
  notesData = filterNote;
  res.json({ notes: filterNote })

})
let PORT = 4000;


// http.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction)

if (!isProduction) {
  // // Set static folder
  // app.use(express.static(path.join(__dirname, "../client/build")));

  // app.get("*", (req, res) => {

  //   res.sendFile(
  //     path.resolve(__dirname, "..", "client", "build", "index.html")
  //   ); // index is in /server/src so 2 folders up
  // });
  app.listen(process.env.PORT || 4000);

} else {
  app.listen(process.env.PORT || 4000);
}


