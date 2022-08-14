import { Checkbox, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TypingInput } from "../components/TypingInput";
import { PlayerType, status } from "../types/Player";

export const GameRoomComponent = ({
  players,
  playerID,
  wordList,
  addCorrectWords,
  addWrittenWords,
}: {
  players: PlayerType[];
  playerID: string;
  wordList: string[];
  addCorrectWords: () => void;
  addWrittenWords: () => void;
}) => {
  const [wordListIndex, setWordListIndex] = useState(0);
  const [writtenWords, setWrittenWords] = useState<string[]>([]);
  const [status, setStatus] = useState<status>("waiting");

  const isWordCorrect = async (text: string) => {
    let wordCorrect: boolean = wordList[wordListIndex] === text.trim();

    if (wordCorrect) addCorrectWords();

    await addWrittenWords();
    setWrittenWords((previousWrittenWords: any) => [
      ...previousWrittenWords,
      wordCorrect.toString(),
    ]);
    setWordListIndex((previousIndex) => previousIndex + 1);
  };

  const getWordColor = (idx: number) => {
    return writtenWords[idx]
      ? writtenWords[idx] === "true"
        ? "#42fcad"
        : "#ff0000"
      : wordListIndex === idx
      ? "#fff"
      : "#6B7280";
  };

  useEffect(() => {
    if (players.length === 2) {
      setStatus("counting");
    }
  }, [players.length]);

  useEffect(() => {
    if (players.length) {
      if (players[0]?.writtenWords === 50 || players[1]?.writtenWords === 50) {
        setStatus("results");
      }
    }
  }, [players.length, players]);

  return (
    <Flex flexDir="column" padding={20} alignItems="center" height="100vh">
      {playerID && (
        <>
          <Flex
            flexDir={
              players.findIndex((e) => e.id === playerID) === 0
                ? "row"
                : "row-reverse"
            }
            width="80%"
            alignItems="center"
            justifyContent="space-between"
            mb={20}
          >
            {players.map((player, idx) => (
              <Flex flexDir="row" alignItems="center" key={idx}>
                <Text color="#fff" fontSize={27} fontFamily="Russo One">
                  {player.id === playerID ? "You" : `Player ${player.id}`}
                </Text>

                <Text
                  color="#42fcad"
                  fontSize={27}
                  fontFamily="Russo One"
                  pl={5}
                >
                  {player.correctWords} / 50
                </Text>
              </Flex>
            ))}
          </Flex>

          <Flex
            flexDir="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Flex
              flexDir="row"
              padding={5}
              maxWidth="50%"
              flexWrap="wrap"
              mb={20}
              borderWidth={2}
              borderColor={status === "playing" ? "#fff" : "#6B7280"}
              borderRadius={10}
            >
              {wordList.map((word, idx) => (
                <Flex fontSize={25} paddingRight={3} fontWeight={400} key={idx}>
                  <Text color={getWordColor(idx)}>{word}</Text>
                </Flex>
              ))}
            </Flex>

            <TypingInput
              isWordCorrect={isWordCorrect}
              status={status}
              changeStatus={setStatus}
              players={players}
              playerID={playerID}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
