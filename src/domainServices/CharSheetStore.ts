import { action, computed, makeObservable, observable, toJS } from "mobx";
import { CharSheet, CharSheetContent, CharSheetMeta } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewDefinedCharSheet,
  getNewCharSheet,
  ClaudiaCharSheet2,
} from "./charSheet";
import { clone } from "ramda";
import { assert } from "../utils/assert";

import { v4 as uuid } from "uuid";
import { generateCopyName } from "../utils/generateCopyName";
import { injectable } from "inversify";

@injectable()
export class CharSheetStore {
  _charSheets: Record<string, CharSheet> = {};

  constructor() {
    makeObservable(this, {
      _charSheets: observable,
      charSheets: computed,
      create: action,
      add: action,
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

  exists(id: string): boolean {
    return !!this._charSheets[id];
  }

  isNameUsed(name: string): boolean {
    return Object.values(this._charSheets).some((el) => el.name === name);
  }

  // #endregion

  // #region actions
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

  copy(id: string): void {
    const original = this.get(id);
    assert(!!original);
    const copy = clone(toJS(original));
    copy.id = uuid();
    copy.name = generateCopyName(
      original.name,
      new Set(Object.values(this._charSheets).map((el) => el.name))
    );
    this._charSheets[copy.id] = copy;
  }

  delete(id: string): void {
    delete this._charSheets[id];
  }

  updateMeta(id: string, charSheetPatch: Partial<CharSheetMeta>) {
    this._charSheets[id] = {
      ...this._charSheets[id],
      ...charSheetPatch,
    };
  }

  updateContent(id: string, charSheetPatch: Partial<CharSheetContent>) {
    this._charSheets[id] = {
      ...this._charSheets[id],
      updatedAt: new Date(),
      ...charSheetPatch,
    };
  }
  // #endregion
}

