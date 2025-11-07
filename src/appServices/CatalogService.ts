import { makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewDefinedCharSheet,
} from "../domainServices/charSheet";

export class CatalogService {
  _charSheets: CharSheet[] = [ClaudiaCharSheet(), getNewDefinedCharSheet()];

  constructor() {
    makeObservable(this, {
      _charSheets: observable,
    });
  }
}

export const catalogService = new CatalogService();
