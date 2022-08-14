export type status = "waiting" | "counting" | "playing" | "results";

export interface PlayerType {
  id: string;
  roomID: string;
  correctWords: number;
  writtenWords: number;
}
