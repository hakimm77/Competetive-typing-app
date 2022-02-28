import { Flex, Image } from "@chakra-ui/react";

const BackButton = () => {
  return (
    <Flex
      pos="absolute"
      top={10}
      left={5}
      bgColor="white"
      borderRadius="100%"
      cursor="pointer"
      onClick={() => {
        window.history.back();
      }}
    >
      <Image src={require("../assets/back-button.png")} w="60px" h="60px" />
    </Flex>
  );
};

export default BackButton;
