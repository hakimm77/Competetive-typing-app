import React, { SetStateAction } from "react";
import { PlayerType } from "./RoomType";

export interface TextContainerType {
  wordList: Array<string | undefined>;
  currentWordIndex: number;
  begin: boolean;
  currentInput: string;
  setCurrentInput: React.Dispatch<SetStateAction<string>>;
  startTimer?: () => void;
  handleKeyDown: (key: any) => void;
  multiplayer?: boolean;
  firstIndex?: number;
  secondIndex?: number;
}
