import { Flex, Image } from "@chakra-ui/react";

const BackButton = () => {
  return (
    <Flex
      pos="absolute"
      top={10}
      left={5}
      _hover={{ backgroundColor: "gray" }}
      borderColor="#fff"
      borderWidth={4}
      borderRadius="100%"
      cursor="pointer"
      onClick={() => {
        window.history.back();
      }}
    >
      <Image
        src={require("../assets/back-button.png")}
        padding={2}
        w="60px"
        h="60px"
      />
    </Flex>
  );
};

export default BackButton;
