import { action, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import { getNewCharSheet } from "../domainServices/charSheet";

export class CharSheetService {
  _charSheet: CharSheet = getNewCharSheet();

  constructor() {
    makeObservable(this, {
      _charSheet: observable,
      setPlayerName: action,
      setCharacterName: action,
      setPowerName: action,
      createPower: action,
    });
  }

  setCharacterName(name: string) {
    this._charSheet.characterName = name;
  }

  setPlayerName(name: string) {
    this._charSheet.playerName = name;
  }

  setPowerName(index: number, name: string) {
    const p = this._charSheet.powers[index];
    p.name = name;
  }

  createPower() {
    if (this._charSheet.powers.length >= 15) {
      return;
    }

    this._charSheet.powers.push({ name: "", value: 1 });
  }
}

export const charSheetService = new CharSheetService();
