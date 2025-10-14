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
    });
  }

  setCharacterName(name: string) {
    this._charSheet.characterName = name;
  }

  setPlayerName(name: string) {
    this._charSheet.playerName = name;
  }
}

export const charSheetService = new CharSheetService();
