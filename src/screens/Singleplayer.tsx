import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import randomWords from "random-words";
import TextTypingContainer from "../components/TextTypingContainer";
import BackButton from "../components/BackButton";

declare global {
  interface Window {
    myTimer: any;
  }
}

const Singleplayer = () => {
  const [begin, setBegin] = useState(false);
  const [timer, setTimer] = useState<any>(60);
  const [wordList, setWordList] = useState<Array<string | undefined>>(
    randomWords(50)
  );
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);

  const checkWord = () => {
    if (wordList[currentWordIndex] === currentInput.trim()) {
      setCorrectWords(correctWords + 1);
    } else {
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

  const restartGame = () => {
    clearInterval(window.myTimer);
    setTimer(60);
    setBegin(false);
    setCurrentWordIndex(0);
    setCurrentInput("");
    setWordList(randomWords(50));
  };

  const startTimer = () => {
    setBegin(true);
    setCorrectWords(0);
    setIncorrectWords(0);
    setWordsPerMinute(0);

    window.myTimer = setInterval(() => {
      setTimer((previous: any) => {
        if (previous === 0) {
          restartGame();
        } else {
          return previous - 1;
        }
      });
    }, 1000);
  };

  useEffect(() => {
    if (currentWordIndex === wordList.length) {
      restartGame();
    }

    if (begin && timer < 60) {
      setWordsPerMinute(
        Math.round(((correctWords + incorrectWords) * 60) / (60 - timer))
      );
    }
  }, [currentWordIndex, timer]);

  return (
    <Flex flexDir="column" w="100%" h="100vh" alignItems="center" pt="50px">
      <BackButton />

      <Text color="white" fontSize={28} mb={30}>
        {timer}
        {"s"}
      </Text>

      <TextTypingContainer
        begin={begin}
        currentInput={currentInput}
        currentWordIndex={currentWordIndex}
        handleKeyDown={handleKeyDown}
        setCurrentInput={setCurrentInput}
        startTimer={startTimer}
        wordList={wordList}
      />

      <Flex
        flexDir="row"
        w="25%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir="column" alignItems="center">
          <Text fontSize={23} color="white">
            {wordsPerMinute}
          </Text>
          <Text fontSize={23} color="white">
            WPM
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Text fontSize={23} color="white">
            {correctWords || incorrectWords
              ? Math.round(
                  (correctWords / (correctWords + incorrectWords)) * 100
                )
              : 0}
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

export default Singleplayer;
