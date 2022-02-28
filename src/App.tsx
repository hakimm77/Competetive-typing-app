import React, { useEffect, useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Singleplayer from "./screens/Singleplayer";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import MainMenu from "./screens/MainMenu";
import Multiplayer from "./screens/Multiplayer";
import Leaderboard from "./screens/Leaderboard";

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
          <Route path="/singleplayer" component={Singleplayer} />
          <Route path="/multiplayer/:id" component={Multiplayer} />
          <Route path="/home" component={MainMenu} />
          {/* <Route path="/leaderboard" component={Leaderboard} /> */}

          <Redirect from="***" exact={true} to={"/home"} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
