import { useEffect, useState } from "react";
import { GameRoomComponent } from "../layout/GameRoomComponent";
import { io } from "socket.io-client";
import { PlayerType } from "../types/Player";

const socket = io(process.env.REACT_APP_SERVER_URL as string);

const GameRoom = ({ match }: { match: any }) => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [roomID, setRoomID] = useState<string>(match.params.id);
  const [playerID, setPlayerID] = useState<string>("");

  const addCorrectWords = () => {
    socket.emit("add-correct-words", {
      roomID: roomID,
      playerIndex: players.findIndex((e) => e.id === playerID),
    });
  };

  const addWrittenWords = () => {
    socket.emit("add-written-words", {
      roomID: roomID,
      playerIndex: players.findIndex((e) => e.id === playerID),
    });
  };

  useEffect(() => {
    socket.emit("new-player", {
      roomID: roomID,
      correctWords: 0,
      writtenWords: 0,
    });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setPlayerID(socket.id);

      socket.on("players-update", async (room) => {
        if (room) {
          setPlayers(room.players);
        }
      });

      socket.on("words", async (words) => {
        if (words) {
          setWordList(words);
        }
      });

      socket.on("quit", async (quitReason) => {
        if (quitReason) {
          alert(quitReason);
          window.location.href = "/";
        }
      });
    });

    return () => {
      socket.off("players-update");
      socket.off("words");
      socket.off("quit");
    };
  }, []);

  return (
    <GameRoomComponent
      players={players}
      playerID={playerID}
      wordList={wordList}
      addCorrectWords={addCorrectWords}
      addWrittenWords={addWrittenWords}
    />
  );
};

export default GameRoom;
