const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const io = require("socket.io")(server);
const { addPlayer } = require("./controllers/addPlayer");
const { removePlayer } = require("./controllers/removePlayer");
const { addCorrectWords } = require("./controllers/addCorrectWords");
const { addWrittenWords } = require("./controllers/");

const PORT = process.env.PORT || 4000;

app.use(cors());
let rooms = [];

app.get("/", (req, res) => {
  //  res.send("hello world");
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("new-player", (newPlayer) => {
      addPlayer(newPlayer, io, socket, rooms);
    });

    socket.on("add-correct-words", (roomInfo) => {
      addCorrectWords(roomInfo, io, rooms);
    });

    socket.on("add-written-words", (roomInfo) => {
      addWrittenWords(roomInfo, io, rooms);
    });

    socket.on("disconnect", async () => {
      await removePlayer(io, socket, rooms);
    });
  });
});

server.listen(PORT, () => {
  console.log("Listening on port 4000");
});
