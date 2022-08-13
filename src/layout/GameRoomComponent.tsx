import { Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { TypingInput } from "../components/TypingInput";
import { PlayerType } from "../types/Player";

export const GameRoomComponent = ({
  players,
  playerID,
  wordList,
}: {
  players: PlayerType[];
  playerID: string;
  wordList: string[];
}) => {
  const [wordListIndex, setWordListIndex] = useState(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [writtenWords, setWrittenWords] = useState<any>({});

  const storeCurrentText = (text: string, keyCode: number | undefined) => {
    if (keyCode === 32) {
      const isWordCorrect = wordList[wordListIndex] === currentText;
      setWrittenWords({
        ...writtenWords,
        [currentText]: { isCorrect: isWordCorrect },
      });
      setCurrentText("");
      setWordListIndex(wordListIndex + 1);
    }

    setCurrentText(text);
  };

  return (
    <Flex flexDir="column" padding={20} alignItems="center" height="100vh">
      {playerID && (
        <>
          <Flex
            flexDir="row"
            width="80%"
            alignItems="center"
            justifyContent="space-between"
            mb={20}
          >
            {players.map((player, idx) => (
              <Text color="#fff" fontSize={27} fontFamily="Russo One" key={idx}>
                {player.id === playerID ? "You" : `Player ${player.id}`}
              </Text>
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
            >
              {wordList.map((word, idx) => (
                <Flex fontSize={25} paddingRight={3} fontWeight={400} key={idx}>
                  <Text
                    color={
                      writtenWords[word]
                        ? writtenWords[word].isCorrect
                          ? "#fff"
                          : "#ff0000"
                        : "#6B7280"
                    }
                  >
                    {word}
                  </Text>
                </Flex>
              ))}
            </Flex>

            <TypingInput
              storeCurrentText={storeCurrentText}
              currentText={currentText}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
