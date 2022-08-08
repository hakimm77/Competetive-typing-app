import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { InviteComponent } from "../layout/InviteComponent";
import generateId from "../helpers/generateId";

const Multiplayer = () => {
  const [roomID, setRoomID] = useState<string>(generateId());

  // useEffect(() => {
  //   socket.on("update-room", async (res) => {
  //     if (res) {
  //       setPlayers(res);
  //     }
  //   });
  // }, []);

  return (
    <Flex flexDir="column" height="100vh" alignItems="center">
      <motion.div
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ margin: 80, marginBottom: 150 }}
      >
        <Text color="#fff" fontFamily="Russo One" fontSize={60}>
          <span
            style={{
              borderBottomWidth: 5,
              borderColor: "#fff",
              color: "#765c44",
            }}
          >
            Fast
          </span>{" "}
          typing race
        </Text>
      </motion.div>

      <InviteComponent roomID={roomID} />
    </Flex>
  );
};

export default Multiplayer;
