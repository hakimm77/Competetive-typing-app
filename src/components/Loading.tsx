import { Flex, Spinner, Text } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Flex
      w="100%"
      h="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner color="#fff" size="xl" mb={5} speed="0.7s" />
      <Text color="#fff" fontSize={25}>
        Waiting for another player to join...
      </Text>
    </Flex>
  );
};
