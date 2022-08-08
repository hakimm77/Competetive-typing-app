import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Multiplayer from "./screens/Multiplayer";
import GameRoom from "./screens/GameRoom";

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
      <BrowserRouter>
        <Switch>
          <Route path="/multiplayer" component={Multiplayer} />
          <Route path="/game/:id" component={GameRoom} />

          <Redirect from="***" exact={true} to={"/multiplayer"} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
