const randomWords = require("random-words");

const addPlayer = async (newPlayer, io, socket, rooms) => {
  const room =
    rooms.length > 0 && rooms.find((e) => e.roomID === newPlayer.roomID);

  await socket.join(newPlayer.roomID);
  if (room) {
    await rooms[rooms.indexOf(room)].players.push({
      ...newPlayer,
      id: socket.id,
    });
    await io.to(newPlayer.roomID).emit("players-update", room);
  } else {
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
