import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet, CharSheetContent } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewCharSheet,
  getNewDefinedCharSheet,
} from "../domainServices/charSheet";
import { charSheetStore } from "../domainServices/CharSheetStore";

export class CharSheetEditorUiStore {
  // _charSheet: CharSheet = getNewCharSheet();
  // _charSheet: CharSheet = getNewDefinedCharSheet();

  // _content: CharSheetContent = ClaudiaCharSheet().content;
  // _name: string;
  // _content: CharSheetContent;

  _id: string = "";

  constructor(id?: string) {
    // const charSheet = getNewCharSheet();
    // this._name = charSheet.name;
    // this._content = { ...charSheet };

    makeObservable(this, {
      _id: observable,
      // _content: observable,
      _name: computed,
      _content: computed,
      charSheet: computed,
      charSheetExists: computed,

      setId: action,
      // setPlayerName: action,
      // setCharacterName: action,
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

    if (id) {
      this.setId(id);
    }
  }

  get charSheet(): CharSheet {
    return charSheetStore.get(this._id)!;
  }

  get _name(): string {
    return this.charSheet.name;
  }

  get _content(): CharSheetContent {
    return this.charSheet;
  }

  get charSheetExists(): boolean {
    return this.charSheet !== undefined;
  }

  setId(id: string) {
    this._id = id;
  }

  // setCharSheet(charSheet: CharSheet) {
  //   // this._charSheet = charSheet;
  //   this._name = charSheet.name;
  //   this._content = { ...charSheet };
  // }

  get canCreatePower() {
    return this.charSheet.powers.length < 15;
  }

  // setCharacterName(name: string) {
  //   this._charSheet.characterName = name;
  // }

  // setPlayerName(name: string) {
  //   this._charSheet.playerName = name;
  // }

  // #region Powers
  setPowerName(index: number, name: string) {
    const powers = [...this.charSheet.powers];
    powers[index] = { ...powers[index], name };
    charSheetStore.update(this._id, { powers });
  }

  createPower() {
    if (!this.canCreatePower) {
      return;
    }

    const powers = [...this.charSheet.powers, { name: "", value: 1 }];
    charSheetStore.update(this._id, { powers });
  }

  setPowerValue(index: number, value: number) {
    const powers = [...this.charSheet.powers];
    powers[index] = { ...powers[index], value };
    charSheetStore.update(this._id, { powers });
  }

  removePower(index: number) {
    const powers = this.charSheet.powers.filter((_, i) => i !== index);
    charSheetStore.update(this._id, { powers });
  }

  // #endregion

  // #region Dreamland Powers
  get canCreateDreamlandPower() {
    return this.charSheet.dreamlandPowers.length < 3;
  }

  createDreamlandPower() {
    if (!this.canCreateDreamlandPower) return;
    this._content.dreamlandPowers.push({ name: "", value: 1 });
  }

  setDreamlandPowerName(index: number, name: string) {
    const p = this._content.dreamlandPowers[index];
    p.name = name;
  }

  setDreamlandPowerValue(index: number, value: number) {
    const p = this._content.dreamlandPowers[index];
    p.value = value;
  }

  removeDreamlandPower(index: number) {
    this._content.dreamlandPowers = this._content.dreamlandPowers.filter(
      (_, i) => i !== index
    );
  }

  // #endregion

  // #region Weakness
  setWeaknessName(name: string) {
    this._content.weakness.name = name;
  }

  setWeaknessValue(value: number) {
    this._content.weakness.value = value;
  }
  // #endregion

  // #region Recollections
  get canCreateRecollection() {
    return this.charSheet.recollections.length < 3;
  }

  createRecollection() {
    this._content.recollections.push({ name: "", value: 1 });
  }

  setRecollectionName(index: number, name: string) {
    const r = this._content.recollections[index];
    r.name = name;
  }

  setRecollectionValue(index: number, value: number) {
    const r = this._content.recollections[index];
    r.value = value;
  }

  removeRecollection(index: number) {
    this._content.recollections = this._content.recollections.filter(
      (_, i) => i !== index
    );
  }
  // #endregion

  // #region Mental Conditions
  get canCreateMentalCondition() {
    return this.charSheet.mentalConditions.length < 3;
  }

  createMentalCondition() {
    this._content.mentalConditions.push({
      name: "",
      value: 1,
      isInjury: false,
    });
  }

  setMentalConditionName(index: number, name: string) {
    const c = this._content.mentalConditions[index];
    c.name = name;
  }

  setMentalConditionValue(index: number, value: number) {
    const c = this._content.mentalConditions[index];
    c.value = value;
  }

  setMentalConditionInjury(index: number, isInjury: boolean) {
    const c = this._content.mentalConditions[index];
    c.isInjury = isInjury;
  }

  removeMentalCondition(index: number) {
    this._content.mentalConditions = this._content.mentalConditions.filter(
      (_, i) => i !== index
    );
  }
  // #endregion

  // #region Body Wounds
  get canCreateBodyWound() {
    return this.charSheet.bodyWounds.length < 6;
  }

  createBodyWound() {
    this._content.bodyWounds.push({ name: "", value: 1, isInjury: false });
  }

  setBodyWoundName(index: number, name: string) {
    const b = this._content.bodyWounds[index];
    b.name = name;
  }

  setBodyWoundValue(index: number, value: number) {
    const b = this._content.bodyWounds[index];
    b.value = value;
  }

  setBodyWoundInjury(index: number, isInjury: boolean) {
    const b = this._content.bodyWounds[index];
    b.isInjury = isInjury;
  }

  removeBodyWound(index: number) {
    this._content.bodyWounds = this._content.bodyWounds.filter(
      (_, i) => i !== index
    );
  }
  // #endregion

  // #region Temporal Conditions
  createTemporalCondition() {
    this._content.temporalConditions.push({ name: "", value: 1 });
  }

  setTemporalConditionName(index: number, name: string) {
    const c = this._content.temporalConditions[index];
    c.name = name;
  }

  setTemporalConditionValue(index: number, value: number) {
    const c = this._content.temporalConditions[index];
    c.value = value;
  }

  removeTemporalCondition(index: number) {
    this._content.temporalConditions = this._content.temporalConditions.filter(
      (_, i) => i !== index
    );
  }
  // #endregion

  // #region Items
  createItem() {
    this._content.items.push("");
  }

  setItemName(index: number, name: string) {
    this._content.items[index] = name;
  }

  removeItem(index: number) {
    this._content.items = this._content.items.filter((_, i) => i !== index);
  }
  // #endregion

  // #region Luck
  setLuck(value: number) {
    this._content.luck = value;
  }
  // #endregion

  // #region Notes
  setNotes(value: string) {
    this._content.notes = value;
  }
  // #endregion
}

const list = Object.values(charSheetStore.charSheets);
export const charSheetEditorUiStore = new CharSheetEditorUiStore(list[0]?.id);

// charSheetEditorUiStore.setCharSheet(ClaudiaCharSheet());
