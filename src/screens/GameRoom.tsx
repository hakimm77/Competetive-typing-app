import { useEffect, useState } from "react";
import { GameRoomComponent } from "../layout/GameRoomComponent";
import { io } from "socket.io-client";
import { PlayerType } from "../types/Player";
import generateId from "../helpers/generateId";

const socket = io("http://localhost:4000/");

const GameRoom = ({ match }: { match: any }) => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [roomID, setRoomID] = useState<string>(match.params.id);
  const [playerID, setPlayerID] = useState<string>("");

  useEffect(() => {
    socket.emit("new-player", { roomID: roomID });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setPlayerID(socket.id);

      socket.on("players-update", async (room) => {
        console.log("room", room);
        if (room) {
          console.log("room", room);
          setPlayers(room.players);
        }
      });

      socket.on("words", async (res) => {
        if (res) {
          setWordList(res);
        }
      });

      socket.on("quit", async (res) => {
        if (res) {
          alert("Oponent quit");
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
    />
  );
};

export default GameRoom;
