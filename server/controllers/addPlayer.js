const randomWords = require("random-words");

const addPlayer = async (newPlayer, io, socket, rooms) => {
  const room =
    rooms.length > 0 && rooms.find((e) => e.roomID === newPlayer.roomID);

  if (room) {
    if (room.players.length === 2) {
      socket.emit("quit", "game-full");
      return;
    }
    await socket.join(newPlayer.roomID);

    await rooms[rooms.indexOf(room)].players.push({
      ...newPlayer,
      id: socket.id,
    });
    await io.to(newPlayer.roomID).emit("players-update", room);
  } else {
    await socket.join(newPlayer.roomID);

    await rooms.push({
      roomID: newPlayer.roomID,
      players: [{ ...newPlayer, id: socket.id }],
    });
    await io.to(newPlayer.roomID).emit("players-update", {
      roomID: newPlayer.roomID,
      players: [{ ...newPlayer, id: socket.id }],
    });
  }
  await io.to(newPlayer.roomID).emit("words", randomWords(50));
};

module.exports = { addPlayer };
