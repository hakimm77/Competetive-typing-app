import React from "react";
import {
  Button,
  Flex,
  Input,
  InputAddon,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import { TextContainerType } from "../types/TextContainerType";

const TextTypingContainer: React.FC<TextContainerType> = ({
  wordList,
  currentWordIndex,
  begin,
  currentInput,
  setCurrentInput,
  handleKeyDown,
  startTimer,
  multiplayer,
  firstIndex,
  secondIndex,
}) => {
  return (
    <>
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
            {word?.split("").map((char, charIdx) =>
              multiplayer ? (
                <Flex
                  key={charIdx}
                  borderBottomWidth="2px"
                  borderBottomColor={
                    firstIndex === i
                      ? "white"
                      : secondIndex === i
                      ? "#2a6197"
                      : "transparent"
                  }
                >
                  <Text
                    fontSize={30}
                    color={
                      firstIndex === i
                        ? "white"
                        : secondIndex === i
                        ? "#2a6197"
                        : "gray"
                    }
                  >
                    {char}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  key={charIdx}
                  borderBottomWidth="2px"
                  borderBottomColor={
                    currentWordIndex === i ? "white" : "transparent"
                  }
                >
                  <Text
                    fontSize={30}
                    color={currentWordIndex === i ? "white" : "gray"}
                  >
                    {char}
                  </Text>
                </Flex>
              )
            )}
          </Flex>
        ))}
      </Flex>

      <InputGroup w="60%" mb={50} h={50}>
        <Input
          autoFocus={true}
          disabled={!begin}
          color="white"
          fontSize={20}
          onKeyDown={handleKeyDown}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />

        {!begin && startTimer && (
          <InputRightAddon>
            <Button onClick={startTimer}>Start</Button>
          </InputRightAddon>
        )}
      </InputGroup>
    </>
  );
};

export default TextTypingContainer;
