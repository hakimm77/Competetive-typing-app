import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import randomWords from "random-words";

const GameScreen = () => {
  const [begin, setBegin] = useState(false);
  const [timer, setTimer] = useState<any>(60);
  const [wordList, setWordList] = useState<Array<string | undefined>>(
    randomWords(50)
  );
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);

  const checkWord = () => {
    if (wordList[currentWordIndex] === currentInput.trim()) {
      console.log(true, currentWordIndex);
      setCorrectWords(correctWords + 1);
    } else {
      console.log(false, currentWordIndex);
      setIncorrectWords(incorrectWords + 1);
    }

    setCurrentWordIndex(currentWordIndex + 1);
  };

  const handleKeyDown = (key: any) => {
    if (key.keyCode === 32) {
      setCurrentInput("");
      checkWord();
    }
  };

  const startTimer = () => {
    setBegin(true);

    const timerInterval = setInterval(() => {
      setTimer((previous: any) => {
        if (previous === 0) {
          clearInterval(timerInterval);
          setTimer(60);
          setBegin(false);
        } else {
          return previous - 1;
        }
      });
    }, 1000);
  };

  return (
    <Flex flexDir="column" w="100%" h="100vh" alignItems="center" mt="50px">
      <Flex mb={30} flexDir="column" alignItems="center">
        <Text color="white" fontSize={28}>
          {timer}
          {"s"}
        </Text>
        {!begin && <Button onClick={startTimer}>Start</Button>}
      </Flex>

      <Flex
        flexDir="row"
        w="60%"
        h={300}
        flexWrap="wrap"
        p={3}
        border="2px solid #fff"
        mb="70px"
      >
        {wordList.map((word, i) => (
          <Flex key={i} pl={2}>
            {word?.split("").map((char, charIdx) => (
              <Flex
                key={charIdx}
                bgColor={currentWordIndex === i ? "white" : "transparent"}
              >
                <Text fontSize={30} color={"gray"}>
                  {char}
                </Text>
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>

      <Input
        autoFocus={true}
        disabled={!begin}
        w="60%"
        h={50}
        mb={50}
        color="white"
        fontSize={20}
        onKeyDown={handleKeyDown}
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
      />

      <Flex
        flexDir="row"
        w="25%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir="column" alignItems="center">
          <Text fontSize={23} color="white">
            {Math.round((correctWords * 60) / (60 - timer))}
          </Text>
          <Text fontSize={23} color="white">
            WPM
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Text fontSize={23} color="white">
            {correctWords && incorrectWords
              ? Math.round(
                  (correctWords / (correctWords + incorrectWords)) * 100
                )
              : 100}
            %
          </Text>
          <Text fontSize={23} color="white">
            Accuracy
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameScreen;
