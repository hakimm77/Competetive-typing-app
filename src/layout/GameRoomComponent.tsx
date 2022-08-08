import { Flex, Text } from "@chakra-ui/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/");

export const GameRoomComponent = ({ roomID }: { roomID: string }) => {
  return (
    <Flex>
      <Text>Game Room</Text>
    </Flex>
  );
};
