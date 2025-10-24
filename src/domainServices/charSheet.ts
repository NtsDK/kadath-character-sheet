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
export function getNewDefinedCharSheet(): CharSheet {
  return {
    characterName: 'characterName',
    playerName: 'playerName',
    powers: [{ name: 'power1', value: 1 }],
    dreamlandPowers: [{ name: 'dreamlandPower1', value: 1 }],
    weakness: { name: 'weakness', value: 1 },
    recollections: [{ name: 'recollection1', value: 1 }],
    temporalConditions: [{ name: 'temporalCondition1', value: 1 }],
    mentalConditions: [{ name: 'mentalCondition1', value: 1, isInjury: false }],
    bodyWounds: [{ name: 'bodyWound1', value: 1, isInjury: false }],
    luck: 3,
    items: ["item1"],
    notes: 'notes',
  };
}
