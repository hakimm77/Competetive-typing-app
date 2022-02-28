import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { PlayerType } from "../types/RoomType";

interface LoadingType {
  players: Array<PlayerType> | undefined;
  currentPlayerIndex: number;
  updatePlayers: (update: any) => void;
}

const Loading: React.FC<LoadingType> = ({
  players,
  currentPlayerIndex,
  updatePlayers,
}) => {
  const getPlayerReady = async () => {
    if (players) {
      let arr = players;
      arr[currentPlayerIndex].status = "playing";

      updatePlayers(arr);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      {players?.length === 2 ? (
        <Flex
          w="60%"
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {players.map((player, idx) => (
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text color="white" fontSize={23} fontWeight="bold" mb={7}>
                {player.name}
              </Text>

              <Button
                disabled={idx !== currentPlayerIndex}
                onClick={getPlayerReady}
              >
                {player.status === "waiting"
                  ? "Click to get ready"
                  : "Ready to play"}
              </Button>
            </Flex>
          ))}
        </Flex>
      ) : (
        <>
          <Spinner color="#fff" />
          <Text color="#fff" fontSize={25} mb={20}>
            Waiting for another player to join...
          </Text>

          <InputGroup w="35%">
            <Input disabled color="white" value={window.location.href} />
            <InputRightAddon>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert(
                    "Link copied, now you can invite your friends to play !"
                  );
                }}
              >
                Copy link
              </Button>
            </InputRightAddon>
          </InputGroup>
        </>
      )}
    </Flex>
  );
};

export default Loading;
