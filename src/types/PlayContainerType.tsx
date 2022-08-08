import React, { SetStateAction } from "react";
import { PlayerType } from "./RoomType";

export type status = "playing" | "waiting" | "score";

export interface PlayContainerType {
  status: status;
}
