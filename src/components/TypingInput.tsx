import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { PlayerType, status } from "../types/Player";
import { Loading } from "./Loading";
import Countdown from "react-countdown";

export const TypingInput = ({
  isWordCorrect,
  status,
  changeStatus,
  players,
  playerID,
}: {
  isWordCorrect: (text: string) => void;
  status: status;
  changeStatus: (newStatus: status) => void;
  players: PlayerType[];
  playerID: string;
}) => {
  const [currentText, setCurrentText] = useState<string>("");

  const handleChangeWord = (e: any) => {
    if (e.keyCode === 32) {
      isWordCorrect(currentText);
      setCurrentText("");
    }
  };

  const handleType = (e: any) => {
    setCurrentText(e.target.value);
  };

  const countdownRender = ({
    seconds,
    completed,
  }: {
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      changeStatus("playing");
      return <></>;
    } else {
      return (
        <Text color="#fff" fontFamily="Russo One" fontSize={25}>
          Game begins in {seconds}
        </Text>
      );
    }
  };

  const displayInput = () => {
    switch (status) {
      case "waiting":
        return <Loading />;
      case "counting":
        return (
          <Countdown
            date={Date.now() + 5000}
            renderer={countdownRender}
            intervalDelay={0}
            precision={3}
          />
        );
      case "playing":
        return (
          <Input
            autoFocus
            width="40%"
            outline="none"
            color="#fff"
            onChange={handleType}
            value={currentText}
            onKeyDown={handleChangeWord}
          />
        );
      case "results":
        return (
          <Flex flexDir={"column"} justifyContent="center" alignItems="center">
            <Text color="#fff" fontSize={27} fontFamily="Russo One" mb={10}>
              {players[0].correctWords > players[1].correctWords
                ? players[0].id === playerID
                  ? "You"
                  : `Player ${players[1].id}`
                : players[1].id === playerID
                ? "You"
                : `Player ${players[1].id}`}{" "}
              won the game
            </Text>

            <Button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Click here to go home
            </Button>
          </Flex>
        );
    }
  };

  return displayInput();
};
