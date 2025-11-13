import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewDefinedCharSheet,
  getNewCharSheet,
} from "./charSheet";

class CharSheetStore {
  _charSheets: Record<string, CharSheet> = {};

  constructor() {
    makeObservable(this, {
      _charSheets: observable,
      charSheets: computed,
      add: action,
      update: action,
      create: action,
    });
  }

  get charSheets(): Record<string, CharSheet> {
    return this._charSheets;
  }

  create(name: string): void {
    if (this.isNameUsed(name)) {
      return;
    }
    const newCharSheet = getNewCharSheet();
    newCharSheet.name = name;
    this._charSheets[newCharSheet.id] = newCharSheet;
  }

  add(charSheet: CharSheet) {
    this._charSheets[charSheet.id] = charSheet;
  }

  get(id: string): CharSheet | undefined {
    return this._charSheets[id];
  }

  exists(id: string): boolean {
    return !!this._charSheets[id];
  }

  isNameUsed(name: string): boolean {
    return Object.values(this._charSheets).some((el) => el.name === name);
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
