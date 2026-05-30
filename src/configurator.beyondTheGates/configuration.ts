import type { Game } from "../domain/Game";

import { dataModel } from "./dataModel";

export const beyondTheGatesGame: Game = {
  name: "По ту сторону Врат",
  id: "beyond-the-gates",
  // version: 1,
  dataModel,
  layout: [
    "powers",
    "dreamlandPowers",
    "weakness",
    "recollections",
    "mentalConditions",
    "bodyWounds",
    "temporalConditions",
    "luck",
    "items",
    "projects",
    "notes",
  ],
  characterCollections: [],
  gearItemCollections: [],
};
