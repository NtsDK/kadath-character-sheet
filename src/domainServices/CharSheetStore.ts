import { action, computed, makeObservable, observable, toJS } from "mobx";
import { clone } from "ramda";
import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";
import * as R from "ramda";

import { assert } from "../utils/assert";
import { generateCopyName } from "../utils/generateCopyName";
import {
  CharSheet,
  CharSheetContent,
  CharSheetMeta,
} from "../domain/CharSheet";
import { IOC_IDS } from "../IoC/Symbols";
import type { ITempStorage } from "../ports";

import { getNewCharSheet } from "./charSheet";

@injectable()
export class CharSheetStore {
  _charSheets: Record<string, CharSheet> = {};

  constructor(
    @inject(IOC_IDS.TempStorage)
    public readonly tempStorage: ITempStorage,
  ) {
    makeObservable(this, {
      _charSheets: observable,
      charSheets: computed,
      create: action,
      insert: action,
      init: action,
      copy: action,
      delete: action,
      updateMeta: action,
      updateContent: action,
    });
  }

  get charSheets(): Record<string, CharSheet> {
    return this._charSheets;
  }

  // #region getters
  get(id: string): CharSheet | undefined {
    return this._charSheets[id];
  }

  getAll(): CharSheet[] {
    return Object.values(this._charSheets);
  }

  exists(id: string): boolean {
    return !!this._charSheets[id];
  }

  isNameUsed(name: string): boolean {
    return Object.values(this._charSheets).some((el) => el.name === name);
  }

  isIdUsed(id: string): boolean {
    return Object.values(this._charSheets).some((el) => el.id === id);
  }

  // #endregion

  // #region actions

  init(charSheets: CharSheet[]): void {
    for (const charSheet of charSheets) {
      this._charSheets[charSheet.id] = charSheet;
    }
  }

  create(name: string): void {
    if (this.isNameUsed(name)) {
      return;
    }
    const newCharSheet = getNewCharSheet();
    newCharSheet.name = name;
    this._charSheets[newCharSheet.id] = newCharSheet;
    this.tempStorage.create(newCharSheet);
  }

  /** Используется при импорте данных */
  insert(charSheet: CharSheet, strategy: "replace" | "create"): void {
    if (strategy === "create") {
      if (this.isNameUsed(charSheet.name)) {
        charSheet.name = generateCopyName(
          charSheet.name,
          new Set(R.pluck("name", Object.values(this._charSheets))),
        );
      }
      if (this.isIdUsed(charSheet.id)) {
        charSheet.id = uuid();
      }
      this._charSheets[charSheet.id] = charSheet;
      this.tempStorage.create(toJS(charSheet));
    } else {
      const currentCharSheet = Object.values(this._charSheets).find(
        (el) => el.name === charSheet.name,
      );
      assert(currentCharSheet);
      charSheet.id = currentCharSheet.id;
      this._charSheets[charSheet.id] = charSheet;
      this.tempStorage.update(toJS(charSheet));
    }
  }

  copy(id: string): void {
    const original = this.get(id);
    assert(!!original);
    const copy = clone(toJS(original));
    copy.id = uuid();
    copy.name = generateCopyName(
      original.name,
      new Set(Object.values(this._charSheets).map((el) => el.name)),
    );
    this._charSheets[copy.id] = copy;
    this.tempStorage.create(copy);
  }

  delete(id: string): void {
    delete this._charSheets[id];
    this.tempStorage.delete(id);
  }

  deleteAll(): void {
    this._charSheets = {};
    this.tempStorage.deleteAll();
  }

  updateMeta(id: string, charSheetPatch: Partial<CharSheetMeta>) {
    this._charSheets[id] = {
      ...this._charSheets[id],
      ...charSheetPatch,
    };
    this.tempStorage.update(toJS(this._charSheets[id]));
  }

  updateContent(id: string, charSheetPatch: Partial<CharSheetContent>) {
    this._charSheets[id] = {
      ...this._charSheets[id],
      updatedAt: new Date(),
      ...charSheetPatch,
    };
    this.tempStorage.update(toJS(this._charSheets[id]));
  }
  // #endregion
}
