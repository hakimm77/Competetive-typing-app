const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const io = require("socket.io")(server);
const randomWords = require("random-words");

const PORT = process.env.PORT || 4000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(PORT, () => {
  console.log("Listening on port 4000");
});

let rooms = [];
const wordList = randomWords(50);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`user joined ${room}`);
    socket.emit("room", room);
    socket.emit("words", wordList);
  });

  socket.on("start", (room) => {
    socket.to(room).emit("start");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server;
