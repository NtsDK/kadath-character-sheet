import { computed, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewDefinedCharSheet,
} from "../domainServices/charSheet";
import { charSheetStore } from "../domainServices/CharSheetStore";

export class CatalogPageUiStore {
  // _charSheets: CharSheet[] = [ClaudiaCharSheet(), getNewDefinedCharSheet()];

  constructor() {
    makeObservable(this, {
      charSheets: computed,
      // _charSheets: observable,
    });
  }

  get charSheets(): CharSheet[] {
    const list = Object.values(charSheetStore.charSheets);
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
}

export const catalogPageUiStore = new CatalogPageUiStore();
