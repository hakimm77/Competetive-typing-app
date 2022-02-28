export interface PlayerType {
  name: string;
  id: string;
  status: "playing" | "waiting";
  game: {
    currentWordIndex: number;
    correctWords: number;
    incorrectWords: number;
  };
}

export interface RoomType {
  roomID: string;
  text: Array<string | undefined>;
  players: Array<PlayerType>;
}
