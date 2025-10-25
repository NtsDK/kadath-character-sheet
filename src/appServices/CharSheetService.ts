import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet } from "../domain/CharSheet";
import { ClaudiaCharSheet, getNewCharSheet, getNewDefinedCharSheet } from "../domainServices/charSheet";

export class CharSheetService {

  // _charSheet: CharSheet = getNewCharSheet();
  // _charSheet: CharSheet = getNewDefinedCharSheet();
  _charSheet: CharSheet = ClaudiaCharSheet();

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
      // mental conditions
      createMentalCondition: action,
      setMentalConditionName: action,
      setMentalConditionValue: action,
      setMentalConditionInjury: action,
      removeMentalCondition: action,
      canCreateMentalCondition: computed,
      // body wounds
      createBodyWound: action,
      setBodyWoundName: action,
      setBodyWoundValue: action,
      setBodyWoundInjury: action,
      removeBodyWound: action,
      canCreateBodyWound: computed,
      // temporal conditions
      createTemporalCondition: action,
      setTemporalConditionName: action,
      setTemporalConditionValue: action,
      removeTemporalCondition: action,
      // items
      createItem: action,
      setItemName: action,
      removeItem: action,
      // luck
      setLuck: action,
      // notes
      setNotes: action,
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

  // #region Mental Conditions
  get canCreateMentalCondition() {
    return this._charSheet.mentalConditions.length < 3;
  }

  createMentalCondition() {
    this._charSheet.mentalConditions.push({ name: "", value: 1, isInjury: false });
  }

  setMentalConditionName(index: number, name: string) {
    const c = this._charSheet.mentalConditions[index];
    c.name = name;
  }

  setMentalConditionValue(index: number, value: number) {
    const c = this._charSheet.mentalConditions[index];
    c.value = value;
  }

  setMentalConditionInjury(index: number, isInjury: boolean) {
    const c = this._charSheet.mentalConditions[index];
    c.isInjury = isInjury;
  }

  removeMentalCondition(index: number) {
    this._charSheet.mentalConditions = this._charSheet.mentalConditions.filter(
      (_, i) => i !== index
    );
  }
  // #endregion

  // #region Body Wounds
  get canCreateBodyWound() {
    return this._charSheet.bodyWounds.length < 6;
  }

  createBodyWound() {
    this._charSheet.bodyWounds.push({ name: "", value: 1, isInjury: false });
  }

  setBodyWoundName(index: number, name: string) {
    const b = this._charSheet.bodyWounds[index];
    b.name = name;
  }

  setBodyWoundValue(index: number, value: number) {
    const b = this._charSheet.bodyWounds[index];
    b.value = value;
  }

  setBodyWoundInjury(index: number, isInjury: boolean) {
    const b = this._charSheet.bodyWounds[index];
    b.isInjury = isInjury;
  }

  removeBodyWound(index: number) {
    this._charSheet.bodyWounds = this._charSheet.bodyWounds.filter((_, i) => i !== index);
  }
  // #endregion

  // #region Temporal Conditions
  createTemporalCondition() {
    this._charSheet.temporalConditions.push({ name: "", value: 1 });
  }

  setTemporalConditionName(index: number, name: string) {
    const c = this._charSheet.temporalConditions[index];
    c.name = name;
  }

  setTemporalConditionValue(index: number, value: number) {
    const c = this._charSheet.temporalConditions[index];
    c.value = value;
  }

  removeTemporalCondition(index: number) {
    this._charSheet.temporalConditions = this._charSheet.temporalConditions.filter((_, i) => i !== index);
  }
  // #endregion

  // #region Items
  createItem() {
    this._charSheet.items.push("");
  }

  setItemName(index: number, name: string) {
    this._charSheet.items[index] = name;
  }

  removeItem(index: number) {
    this._charSheet.items = this._charSheet.items.filter((_, i) => i !== index);
  }
  // #endregion

  // #region Luck
  setLuck(value: number) {
    this._charSheet.luck = value;
  }
  // #endregion

  // #region Notes
  setNotes(value: string) {
    this._charSheet.notes = value;
  }
  // #endregion
}

export const charSheetService = new CharSheetService();
