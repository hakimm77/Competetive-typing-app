import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { GameRoomComponent } from "../layout/GameRoomComponent";
import { status } from "../types/PlayContainerType";

const GameRoom = ({ match }: { match: any }) => {
  const [status, setStatus] = useState<status>("waiting");
  const [roomID, setRoomID] = useState<string>(match.params.id);

  const displayGame = () => {
    switch (status) {
      case "waiting":
        return <Loading />;
      case "playing":
        return <GameRoomComponent roomID={roomID} />;
      case "score":
        return <div>Score</div>;
    }
  };

  return <Flex>{displayGame()}</Flex>;
};

export default GameRoom;
