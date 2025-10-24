import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import { getNewCharSheet } from "../domainServices/charSheet";

export class CharSheetService {

  _charSheet: CharSheet = getNewCharSheet();

  constructor() {
    makeObservable(this, {
      _charSheet: observable,
      setPlayerName: action,
      setCharacterName: action,
      // powers
      setPowerName: action,
      createPower: action,
      setPowerValue: action,
      removePower: action,
      canCreatePower: computed,
      // dreamland powers
      createDreamlandPower: action,
      setDreamlandPowerName: action,
      setDreamlandPowerValue: action,
      removeDreamlandPower: action,
      canCreateDreamlandPower: computed,
      // weakness
      setWeaknessName: action,
      setWeaknessValue: action,
      // recollections
      createRecollection: action,
      setRecollectionName: action,
      setRecollectionValue: action,
      removeRecollection: action,
      canCreateRecollection: computed,
    });
  }

  get canCreatePower() {
    return this._charSheet.powers.length < 15;
  }

  setCharacterName(name: string) {
    this._charSheet.characterName = name;
  }

  setPlayerName(name: string) {
    this._charSheet.playerName = name;
  }

  // #region Powers
  setPowerName(index: number, name: string) {
    const p = this._charSheet.powers[index];
    p.name = name;
  }

  createPower() {
    if (!this.canCreatePower) {
      return;
    }

    this._charSheet.powers.push({ name: "", value: 1 });
  }

  setPowerValue(index: number, value: number) {
    const p = this._charSheet.powers[index];
    p.value = value;
  }

  removePower(index: number) {
    this._charSheet.powers = this._charSheet.powers.filter((_, i) => i !== index);
  }

  // #endregion

  // #region Dreamland Powers
  get canCreateDreamlandPower() {
    return this._charSheet.dreamlandPowers.length < 3;
  }

  createDreamlandPower() {
    if (!this.canCreateDreamlandPower) return;
    this._charSheet.dreamlandPowers.push({ name: "", value: 1 });
  }

  setDreamlandPowerName(index: number, name: string) {
    const p = this._charSheet.dreamlandPowers[index];
    p.name = name;
  }

  setDreamlandPowerValue(index: number, value: number) {
    const p = this._charSheet.dreamlandPowers[index];
    p.value = value;
  }

  removeDreamlandPower(index: number) {
    this._charSheet.dreamlandPowers = this._charSheet.dreamlandPowers.filter((_, i) => i !== index);
  }

  // #endregion

  // #region Weakness
  setWeaknessName(name: string) {
    this._charSheet.weakness.name = name;
  }

  setWeaknessValue(value: number) {
    this._charSheet.weakness.value = value;
  }
  // #endregion

  // #region Recollections
  get canCreateRecollection() {
    return this._charSheet.recollections.length < 3;
  }

  createRecollection() {
    this._charSheet.recollections.push({ name: "", value: 1 });
  }

  setRecollectionName(index: number, name: string) {
    const r = this._charSheet.recollections[index];
    r.name = name;
  }

  setRecollectionValue(index: number, value: number) {
    const r = this._charSheet.recollections[index];
    r.value = value;
  }

  removeRecollection(index: number) {
    this._charSheet.recollections = this._charSheet.recollections.filter((_, i) => i !== index);
  }
  // #endregion
}

export const charSheetService = new CharSheetService();
