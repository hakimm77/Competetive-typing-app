import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import GameScreen from "./screens/GameScreen";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#1f2937",
        overflow: "hidden",
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <GameScreen />
    </ChakraProvider>
  );
};

export default App;
