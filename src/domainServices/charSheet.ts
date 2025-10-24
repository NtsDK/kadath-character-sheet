import { CharSheet } from "../domain/CharSheet";
import * as R from "ramda";

export function getNewCharSheet(): CharSheet {
  return {
    characterName: "",
    playerName: "",
    powers: [],
    dreamlandPowers: [],
    weakness: { name: "", value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [],
    notes: "",
  };
}

export function getNewDefinedCharSheet(): CharSheet {
  return {
    characterName: "characterName",
    playerName: "playerName",
    powers: cloneToArr({ name: "power1", value: 1 }, 15),
    dreamlandPowers: cloneToArr({ name: "dreamlandPower1", value: 1 }, 3),
    weakness: { name: "weakness", value: 1 },
    recollections: cloneToArr({ name: "recollection1", value: 1 }, 3),
    mentalConditions: cloneToArr(
      { name: "mentalCondition1", value: 1, isInjury: false },
      3
    ),
    bodyWounds: cloneToArr(
      { name: "bodyWound1", value: 1, isInjury: false },
      6
    ),
    temporalConditions: cloneToArr({ name: "temporalCondition1", value: 1 }, 5),
    luck: 3,
    items: cloneToArr("item1", 5),
    notes: "notes",
  };
}

function cloneToArr<T>(el: T, count: number): T[] {
  return R.repeat<T>(el, count).map(R.clone<T>);
}
