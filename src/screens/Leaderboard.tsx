import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { db } from "../firebase/config";

const Leaderboard = () => {
  const [userList, setUserList] = useState<any>([]);

  useEffect(() => {
    getDocs(collection(db, "/users")).then((snapchot) => {
      setUserList([]);
      snapchot.forEach((user) => {
        setUserList((p: any) => [...p, user.data()]);
      });
    });
  }, []);

  return (
    <Flex
      flexDir="column"
      width="100%"
      height="100vh"
      alignItems="center"
      pt="80px"
      overflow="auto"
    >
      <BackButton />

      <Heading color="white" size="3xl" mb="80px">
        Leader board
      </Heading>

      {userList.length ? (
        userList.map((user: any) => (
          <Flex
            flexDir="row"
            width={300}
            justifyContent="space-between"
            alignItems="center"
            padding={5}
            border="2px solid gray"
            borderRadius={10}
            mb={5}
          >
            <Text color="white" fontSize={25}>
              {user.name}
            </Text>
            <Text color="white" fontSize={25}>
              {user.highScore + "wpm"}
            </Text>
          </Flex>
        ))
      ) : (
        <Spinner color="#fff" />
      )}
    </Flex>
  );
};

export default Leaderboard;
