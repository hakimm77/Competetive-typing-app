const addWrittenWords = (roomInfo, io, rooms) => {
  rooms.forEach(async (room) => {
    if (room.roomID === roomInfo.roomID) {
      rooms[rooms.indexOf(room)].players[roomInfo.playerIndex].writtenWords =
        (await rooms[rooms.indexOf(room)].players[roomInfo.playerIndex]
          .writtenWords) + 1;
      await io.to(room.roomID).emit("players-update", room);
    }
  });
};

module.exports = { addWrittenWords };
