import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import { ClaudiaCharSheet, getNewDefinedCharSheet } from "./charSheet";

class CharSheetStore {
  _charSheets: Record<string, CharSheet> = {};

  constructor() {
    makeObservable(this, {
      _charSheets: observable,
      charSheets: computed,
      add: action,
      update: action,
    });
  }

  get charSheets(): Record<string, CharSheet> {
    return this._charSheets;
  }

  add(charSheet: CharSheet) {
    this._charSheets[charSheet.id] = charSheet;
  }

  get(id: string): CharSheet | undefined {
    return this._charSheets[id];
  }

  update(id: string, charSheetPatch: Partial<CharSheet>) {
    this._charSheets[id] = {
      ...this._charSheets[id],
      ...charSheetPatch,
    };
  }
}

export const charSheetStore = new CharSheetStore();

charSheetStore.add(ClaudiaCharSheet());
charSheetStore.add(getNewDefinedCharSheet());
