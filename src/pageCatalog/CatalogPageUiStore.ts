import { computed, makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";

import { CharSheet } from "../domain/CharSheet";
import { CharSheetStore } from "../domainServices/CharSheetStore";
import { IOC_IDS } from "../IoC/Symbols";

@injectable()
export class CatalogPageUiStore {
  constructor(
    @inject(IOC_IDS.CharSheetStore)
    public readonly charSheetStore: CharSheetStore,
  ) {
    makeObservable(this, {
      charSheets: computed,
    });
  }

  get charSheets(): CharSheet[] {
    const list = Object.values(this.charSheetStore.charSheets);
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
}
