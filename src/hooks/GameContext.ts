import { createContext } from "react";
import { GameContextType } from "../types/GameContextType";

export const GameContext = createContext<GameContextType>({
  username: "",
  setUsername: () => {},
  status: "registration",
  setStatus: () => {},
});
