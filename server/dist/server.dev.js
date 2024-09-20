"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var notes = require('./db/data.json');

var express = require('express');

var cors = require('cors');

var dotenv = require('dotenv');

var app = express();

var http = require('http').createServer(app);

var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

dotenv.config();
app.use(express.json());

var data = _toConsumableArray(notes);

io.on('connection', function (socket) {
  socket.on("addNote", function (data) {
    socket.broadcast.emit("addNote", data);
  });
  socket.on("deleteNote", function (data) {
    socket.broadcast.emit("deleteNote", data);
  });
  socket.on("updateNote", function (data) {
    console.log(data);
    socket.broadcast.emit("updateNote", data);
  });
});
app.use(cors());
app.get("/notes", function (req, res) {
  res.json(data);
});
app.post("/notes", function (req, res) {
  data.push(req.body);
  console.log(notes);
});
app.put("/notes", function (req, res) {
  console.log(req.body);
  data = req.body;
});
app["delete"]("/notes/:id", function (req, res) {
  var filterNote = data.filter(function (note) {
    return note.id.toString() !== req.params.id.toString();
  });
  data = filterNote;
});
var PORT = 4000;
http.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});