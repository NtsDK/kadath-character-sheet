import { v4 as uuid } from "uuid";

import type { CharSheet } from "../domain/CharSheet";
import { VERSION } from "../constants";

export function getNewCharSheet(): CharSheet {
  return {
    name: "",
    type: "char-sheet/beyond-the-gates",
    id: uuid(),
    updatedAt: new Date(),
    version: VERSION,
    // characterName: "",
    // playerName: "",
    powers: [],
    dreamlandPowers: [],
    weakness: { name: "", value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [],
    projects: [],
    notes: "",
  };
}
