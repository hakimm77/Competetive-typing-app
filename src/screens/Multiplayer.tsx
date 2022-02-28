import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { io } from "socket.io-client";
import { PlayerType, RoomType } from "../types/RoomType";
import Loading from "../components/Loading";
import TextTypingContainer from "../components/TextTypingContainer";
import BackButton from "../components/BackButton";

const socket = io("http://localhost:4000/");

const Multiplayer: React.FC<{ match: any }> = ({ match }) => {
  const [roomID, setRoomID] = useState(match.params.id);
  const [username, setUsername] = useState<string | null>();
  const [begin, setBegin] = useState(false);
  const [players, setPlayers] = useState<Array<PlayerType>>();
  const [wordList, setWordList] = useState<Array<string | undefined>>(["."]);
  const [currentInput, setCurrentInput] = useState("");
  const currentPlayer = players?.filter((e) => e.name === username)[0];
  const currentPlayerIndex = currentPlayer
    ? players?.indexOf(currentPlayer)
    : -1;

  const joinRoom = async () => {
    let name = prompt("Enter a username:");
    setUsername(name);
    setBegin(true);

    socket.emit("new-user", {
      name: name,
      roomID: roomID,
      game: {
        currentWordIndex: 0,
        correctWords: 0,
        incorrectWords: 0,
      },
    });
  };

  const finishGame = (winner: PlayerType) => {
    alert(`${winner.name} won the game !`);
    window.location.href = "/leaderboard";
  };

  const updatePlayers = (update: Array<PlayerType>) => {
    socket.emit("update-players-client", {
      roomID: roomID,
      update: update,
    });
  };

  const checkWord = async () => {
    if (currentPlayer) {
      let arr: Array<PlayerType> = players;

      if (
        wordList[currentPlayer.game.currentWordIndex] === currentInput.trim()
      ) {
        arr[currentPlayerIndex].game.correctWords =
          currentPlayer.game.correctWords + 1;
      } else {
        arr[currentPlayerIndex].game.incorrectWords =
          currentPlayer.game.incorrectWords + 1;
      }
      arr[currentPlayerIndex].game.currentWordIndex =
        currentPlayer.game.currentWordIndex + 1;

      updatePlayers(arr);
    }
  };

  const handleKeyDown = (key: any) => {
    if (key.keyCode === 32) {
      setCurrentInput("");
      checkWord();
    }
  };

  useEffect(() => {
    socket.on("update-players-server", (res: any) => {
      const room: RoomType = res.filter(
        (e: RoomType) => e.roomID === roomID
      )[0];

      const isRoomFull =
        room.players.length === 2 &&
        (room.players[0].name !== username ||
          room.players[1].name !== username);

      if (begin) {
        if (room) {
          setWordList(room.text);
          setPlayers(room.players);
        } else {
          alert("The second player quit the game");
          window.location.href = "/";
        }
      }
    });
  }, [begin]);

  useEffect(() => {
    if (begin && players?.length === 2) {
      if (players[0].game.currentWordIndex === wordList.length) {
        finishGame(players[0]);
      } else if (players[1].game.currentWordIndex === wordList.length) {
        finishGame(players[1]);
      }
    }
  }, [players]);

  return (
    <Flex>
      <BackButton />

      {username ? (
        <>
          {begin &&
          players &&
          players[0].status === "playing" &&
          players[1].status === "playing" ? (
            <Flex
              flexDir="column"
              w="100%"
              h="100vh"
              alignItems="center"
              mt="50px"
            >
              <TextTypingContainer
                wordList={wordList}
                begin={begin}
                handleKeyDown={handleKeyDown}
                currentInput={currentInput}
                setCurrentInput={setCurrentInput}
                currentWordIndex={
                  currentPlayer?.game.currentWordIndex as number
                }
                multiplayer={true}
                firstIndex={players[0].game.currentWordIndex}
                secondIndex={players[1].game.currentWordIndex}
              />
            </Flex>
          ) : (
            <Loading
              players={players}
              currentPlayerIndex={currentPlayerIndex}
              updatePlayers={updatePlayers}
            />
          )}
        </>
      ) : (
        <Flex w="100%" h="100vh" justifyContent="center" alignItems="center">
          <Button onClick={joinRoom}>Join room</Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Multiplayer;
