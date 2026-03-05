import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import * as R from "ramda";

import { IOC_IDS } from "../IoC/Symbols";
import type { IImportManager } from "../ports";
import { CharSheet } from "../domain/CharSheet";
import { CharSheetStore } from "../domainServices";

@injectable()
export class ImportModalUiStore {
  _isModalOpen = false;
  _uploadedCharSheets: CharSheet[] = [];
  _conflictNames: string[] = [];

  constructor(
    @inject(IOC_IDS.ImportManager)
    public readonly importManager: IImportManager,
    @inject(IOC_IDS.CharSheetStore)
    public readonly charSheetStore: CharSheetStore,
  ) {
    makeObservable(this, {
      _isModalOpen: observable,
      _uploadedCharSheets: observable,
      _conflictNames: observable,
      setIsModalOpen: action,
      importArchive: action,
    });
  }
  get isModalOpen() {
    return this._isModalOpen;
  }

  setIsModalOpen(isOpen: boolean) {
    this._isModalOpen = isOpen;
  }

  async importArchive(file: File) {
    this._uploadedCharSheets = [];
    this._conflictNames = [];
    try {
      this._uploadedCharSheets = await this.importManager.import(file);

      // const uploadedCharSheetNames = R.pluck("name", this._uploadedCharSheets);

      const uploadedCharSheetsByNames = R.indexBy(
        R.prop("name"),
        this._uploadedCharSheets,
      );

      const currentCharSheets = this.charSheetStore.getAll();
      // const currentCharSheetNames = R.pluck("name", currentCharSheets);
      const currentCharSheetsByNames = R.indexBy(
        R.prop("name"),
        currentCharSheets,
      );

      const conflictNames = R.intersection(
        Object.keys(uploadedCharSheetsByNames),
        Object.keys(currentCharSheetsByNames),
      );

      if (conflictNames.length > 0) {
        conflictNames.sort((a, b) => a.localeCompare(b));
        this._conflictNames = conflictNames;
        this._isModalOpen = true;
      } else {
        for (const charSheet of this._uploadedCharSheets) {
          this.charSheetStore.insert(charSheet, "create");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
