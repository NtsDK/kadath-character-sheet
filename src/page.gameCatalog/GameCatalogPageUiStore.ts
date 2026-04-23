import { computed, makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";

import { CharSheet } from "../domain/CharSheet";
import { CharSheetStore } from "../domainServices/CharSheetStore";
import { IOC_IDS } from "../IoC/Symbols";
import { GameStore } from "../domainServices";
import { Game } from "../domain/Game";

@injectable()
export class GameCatalogPageUiStore {
  constructor(
    @inject(IOC_IDS.GameStore)
    public readonly gameStore: GameStore,
  ) {
    makeObservable(this, {
      games: computed,
    });
  }

  get games(): Game[] {
    const list = Object.values(this.gameStore.games);
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
}
