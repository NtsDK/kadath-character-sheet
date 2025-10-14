import { CharSheet } from "../domain/CharSheet";

export function getNewCharSheet(): CharSheet {
  return {
    characterName: '',
    playerName: '',
    powers: [],
    dreamlandPowers: [],
    weakness: { name: '', value: 1 },
    recollections: [],
    temporalConditions: [],
    mentalConditions: [],
    bodyWounds: [],
    luck: 0,
    items: [],
    notes: '',
  };
}
