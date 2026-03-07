import { inject, injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import * as R from "ramda";

import { IOC_IDS } from "../IoC/Symbols";
import type { IImportManager } from "../ports";
import { CharSheet } from "../domain/CharSheet";
import { CharSheetStore } from "../domainServices";

import { ConflictInfo, ImportStrategy } from "./types";

@injectable()
export class ImportModalUiStore {
  _isModalOpen = false;
  _uploadedCharSheets: CharSheet[] = [];
  _conflictInfos: ConflictInfo[] = [];

  constructor(
    @inject(IOC_IDS.ImportManager)
    public readonly importManager: IImportManager,
    @inject(IOC_IDS.CharSheetStore)
    public readonly charSheetStore: CharSheetStore,
  ) {
    makeObservable(this, {
      _isModalOpen: observable,
      _uploadedCharSheets: observable,
      _conflictInfos: observable,
      setIsModalOpen: action,
      importArchive: action,
      setImportStrategy: action,
      setImportStrategyToAll: action,
      importCharSheets: action,
    });
  }

  get isModalOpen() {
    return this._isModalOpen;
  }

  get conflictInfos() {
    return this._conflictInfos;
  }

  importCharSheets() {
    const conflictsByName = R.indexBy(R.prop("name"), this._conflictInfos);
    for (const charSheet of this._uploadedCharSheets) {
      const conflictInfo = conflictsByName[charSheet.name];
      if (conflictInfo) {
        const { importStrategy, importingCharSheet } = conflictInfo;
        if (importStrategy === "skip") {
          continue;
        }
        this.charSheetStore.insert(importingCharSheet, importStrategy);
      } else {
        this.charSheetStore.insert(charSheet, "create");
      }
    }
    this.setIsModalOpen(false);
  }

  setIsModalOpen(isOpen: boolean) {
    this._isModalOpen = isOpen;
  }

  setImportStrategy(index: number, importStrategy: ImportStrategy) {
    this._conflictInfos[index].importStrategy = importStrategy;
  }

  setImportStrategyToAll(importStrategy: ImportStrategy) {
    for (const conflictInfo of this._conflictInfos) {
      conflictInfo.importStrategy = importStrategy;
    }
  }

  async importArchive(file: File) {
    this._uploadedCharSheets = [];
    this._conflictInfos = [];
    try {
      this._uploadedCharSheets = await this.importManager.import(file);

      const uploadedCharSheetsByNames = R.indexBy(
        R.prop("name"),
        this._uploadedCharSheets,
      );

      const currentCharSheets = this.charSheetStore.getAll();
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
        this._conflictInfos = conflictNames.map((name) => ({
          name,
          existingCharSheet: currentCharSheetsByNames[name],
          importingCharSheet: uploadedCharSheetsByNames[name],
          importStrategy: "skip",
        }));
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
