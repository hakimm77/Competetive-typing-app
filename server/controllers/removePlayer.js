const removePlayer = async (io, socket, rooms) => {
  rooms.forEach((room) => {
    room.players.forEach(async (player) => {
      if (player.id === socket.id) {
        await io.to(room.roomID).emit("quit", "opponent-quit");
        await rooms.splice(rooms.indexOf(room), 1);
        console.log("user disconnected");
      }
    });
  });
};

module.exports = { removePlayer };
