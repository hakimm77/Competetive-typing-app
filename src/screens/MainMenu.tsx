import { Button, Flex, Heading } from "@chakra-ui/react";
import generateId from "../helpers/generateId";

const MainMenu = () => {
  return (
    <Flex
      flexDir="column"
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Heading color="#fff" mb="200px" size="3xl">
        Fast Typing App
      </Heading>

      <Flex w="35%" justifyContent="space-between" alignItems="center">
        <Button
          w="210px"
          onClick={() => {
            window.location.href = "/singleplayer";
          }}
        >
          Singleplayer
        </Button>

        <Button
          w="210px"
          onClick={() => {
            window.location.href = `multiplayer/${generateId()}`;
          }}
        >
          Competitive
        </Button>
      </Flex>

      {/* <Button
        w="210px"
        mt={20}
        onClick={() => {
          window.location.href = `/leaderboard`;
        }}
      >
        Leader Board
      </Button> */}
    </Flex>
  );
};

export default MainMenu;
