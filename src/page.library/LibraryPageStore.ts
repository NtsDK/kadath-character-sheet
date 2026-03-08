import { action, makeObservable, observable } from "mobx";
import { inject, injectable } from "inversify";

import { CharSheet } from "../domain/CharSheet";
import { IOC_IDS } from "../IoC/Symbols";
import { CharSheetStore, NotificationStore } from "../domainServices";

import {
  beyondTheGatesAllChars,
  BEYOND_THE_GATE_CHARACTERS,
  BeyondTheGateCharacters,
} from "./charSheets";

export type CharValueLabel = { value: string; name: string };

@injectable()
export class LibraryPageStore {
  _characters: Record<string, () => CharSheet> = beyondTheGatesAllChars;

  constructor(
    @inject(IOC_IDS.NotificationStore)
    public readonly notificationStore: NotificationStore,
    @inject(IOC_IDS.CharSheetStore)
    public readonly charSheetStore: CharSheetStore,
  ) {
    makeObservable(this, {
      _characters: observable,
      createCharacter: action,
    });
  }

  createCharacter(charkey: string, showNotification = true) {
    const charGenerateFunc = this._characters[charkey];
    if (!charGenerateFunc) {
      this.notificationStore.notify({
        type: "error",
        message: `Персонаж с ключом ${charkey} не найден`,
      });
      return;
    }

    const char = charGenerateFunc();
    this.charSheetStore.insert(char, "create");
    if (showNotification) {
      this.notificationStore.notify({
        type: "success",
        message: `Создан персонаж ${char.name}`,
        duration: 5,
      });
    }
  }

  createAllBeyondTheGatesChars() {
    for (const charValue of BEYOND_THE_GATE_CHARACTERS) {
      this.createCharacter(charValue, false);
    }
    this.notificationStore.notify({
      type: "success",
      message: "Созданы все персонажи По ту сторону Врат",
      duration: 5,
    });
  }

  getBeyondTheGatesChars(): CharValueLabel[] {
    const charList: CharValueLabel[] = [];
    for (const charValue of BEYOND_THE_GATE_CHARACTERS) {
      if (this._characters[charValue]) {
        const char = this._characters[charValue]();
        charList.push({
          value: charValue,
          name: char.name,
        });
      }
    }
    charList.sort((a, b) => a.name.localeCompare(b.name));
    return charList;
  }

  getOtherChars(): CharValueLabel[] {
    const charList: CharValueLabel[] = [];
    const otherChars = Object.keys(this._characters).filter(
      (charValue) =>
        !BEYOND_THE_GATE_CHARACTERS.includes(
          charValue as BeyondTheGateCharacters,
        ),
    );
    for (const charValue of otherChars) {
      const char = this._characters[charValue]();
      charList.push({
        value: charValue,
        name: char.name,
      });
    }
    return charList;
  }
}
