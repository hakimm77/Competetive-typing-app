const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const randomWords = require("random-words");

//const PORT = process.env.PORT || 4000;
// const server = express()
//   .use(express.static(path.join(__dirname, "../build")))
//   .listen(PORT, () => {
//     console.log("listening on port: 4000");
//   });

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(4000, () => {
  console.log("Listening on port 4000");
});

let rooms = [];
const wordList = randomWords(50);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("new-user", async (newUser) => {
    console.log(newUser);

    const roomIndex = rooms.indexOf(
      rooms.filter((e) => e.roomID === newUser.roomID)[0]
    );

    if (roomIndex > -1) {
      await rooms[roomIndex].players.push({
        name: newUser.name,
        currentWordIndex: 0,
        id: socket.id,
        game: newUser.game,
        status: "waiting",
      });
    } else {
      rooms.push({
        roomID: newUser.roomID,
        text: wordList,
        players: [
          {
            name: newUser.name,
            currentWordIndex: 0,
            id: socket.id,
            status: "waiting",
            game: newUser.game,
          },
        ],
      });
    }

    io.emit("update-players-server", rooms);
  });

  socket.on("update-players-client", async (res) => {
    const roomIndex = rooms.indexOf(
      rooms.filter((e) => e.roomID === res.roomID)[0]
    );

    rooms[roomIndex].players = await res.update;

    io.emit("update-players-server", rooms);
  });

  socket.on("disconnect", async () => {
    rooms.forEach((room) => {
      if (
        room.players[0].id === socket.id ||
        room.players[1].id === socket.id
      ) {
        rooms.splice(rooms.indexOf(room), 1);
      }
    });

    io.emit("update-players-server", rooms);
  });
});
