import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { copyText } from "../helpers/copyText";
import generateId from "../helpers/generateId";

export const InviteComponent = ({ roomID }: { roomID: string }) => {
  const [roomLink, setRoomLink] = useState<string>(
    `http://localhost:3000/game/${roomID}`
  );

  const goToGame = async () => {
    await copyText(roomLink);
    window.location.href = `/game/${roomID}`;
  };

  return (
    <Flex flexDir="column" alignItems="center">
      <Text color="#fff" fontFamily="Russo One" fontSize={25} mb={10}>
        Invite your friend using this link
      </Text>

      <Flex
        flexDir="row"
        borderColor="#fff"
        color="#fff"
        borderRadius="5px"
        mb={20}
        alignItems="center"
      >
        <Input
          disabled
          width={"500px"}
          height={50}
          fontSize={23}
          value={roomLink}
        />
        <Button color="#1D1D1D" onClick={goToGame}>
          Copy link and play
        </Button>
      </Flex>
    </Flex>
  );
};
