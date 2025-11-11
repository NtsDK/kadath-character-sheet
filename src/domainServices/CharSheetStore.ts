import { action, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import { ClaudiaCharSheet, getNewDefinedCharSheet } from "./charSheet";

class CharSheetStore {
  _charSheets: Record<string, CharSheet> = {};

  constructor() {
    makeObservable(this, {
      _charSheets: observable,
      addCharSheet: action
    });
  }

  addCharSheet(charSheet: CharSheet) {
    this._charSheets[charSheet.id] = charSheet;
  }
}

export const charSheetStore = new CharSheetStore();


charSheetStore.addCharSheet(ClaudiaCharSheet());
charSheetStore.addCharSheet(getNewDefinedCharSheet());
