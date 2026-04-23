import { v4 as uuid } from "uuid";

import type { CharSheet } from "../domain/CharSheet";
import { VERSION } from "../constants";
import type { Game } from "../domain/Game";

export function getNewGame(): Game {
  return {
    name: "",
    id: "",
    dataModel: [],
    layout: [],
    characterCollections: [],
    gearItemCollections: [],
  };
}
