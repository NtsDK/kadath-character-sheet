import { action, computed, makeObservable, observable } from "mobx";
import { CharSheet, CharSheetContent } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  getNewCharSheet,
  getNewDefinedCharSheet,
} from "../domainServices/charSheet";
import { charSheetStore } from "../domainServices/CharSheetStore";

export class CharSheetEditorUiStore {
  _id: string = "";

  constructor(id?: string) {
    makeObservable(this, {
      _id: observable,
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

  get charSheetExists(): boolean {
    return this.charSheet !== undefined;
  }

  setId(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

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

  createPower() {
    if (!this.canCreatePower) {
      return;
    }

    const powers = [...this.charSheet.powers, { name: "", value: 1 }];
    charSheetStore.updateContent(this._id, { powers });
  }

  setPowerName(index: number, name: string) {
    const powers = [...this.charSheet.powers];
    powers[index] = { ...powers[index], name };
    charSheetStore.updateContent(this._id, { powers });
  }

  setPowerValue(index: number, value: number) {
    const powers = [...this.charSheet.powers];
    powers[index] = { ...powers[index], value };
    charSheetStore.updateContent(this._id, { powers });
  }

  removePower(index: number) {
    const powers = this.charSheet.powers.filter((_, i) => i !== index);
    charSheetStore.updateContent(this._id, { powers });
  }

  // #endregion

  // #region Dreamland Powers
  get canCreateDreamlandPower() {
    return this.charSheet.dreamlandPowers.length < 3;
  }

  createDreamlandPower() {
    if (!this.canCreateDreamlandPower) return;
    const dreamlandPowers = [
      ...this.charSheet.dreamlandPowers,
      { name: "", value: 1 },
    ];
    charSheetStore.updateContent(this._id, { dreamlandPowers });
  }

  setDreamlandPowerName(index: number, name: string) {
    const dreamlandPowers = [...this.charSheet.dreamlandPowers];
    dreamlandPowers[index] = { ...dreamlandPowers[index], name };
    charSheetStore.updateContent(this._id, { dreamlandPowers });
  }

  setDreamlandPowerValue(index: number, value: number) {
    const dreamlandPowers = [...this.charSheet.dreamlandPowers];
    dreamlandPowers[index] = { ...dreamlandPowers[index], value };
    charSheetStore.updateContent(this._id, { dreamlandPowers });
  }

  removeDreamlandPower(index: number) {
    const dreamlandPowers = this.charSheet.dreamlandPowers.filter(
      (_, i) => i !== index
    );
    charSheetStore.updateContent(this._id, { dreamlandPowers });
  }

  // #endregion

  // #region Weakness
  setWeaknessName(name: string) {
    charSheetStore.updateContent(this._id, {
      weakness: { ...this.charSheet.weakness, name },
    });
  }

  setWeaknessValue(value: number) {
    charSheetStore.updateContent(this._id, {
      weakness: { ...this.charSheet.weakness, value },
    });
  }
  // #endregion

  // #region Recollections
  get canCreateRecollection() {
    return this.charSheet.recollections.length < 3;
  }

  createRecollection() {
    if (!this.canCreateRecollection) {
      return;
    }
    const recollections = [
      ...this.charSheet.recollections,
      { name: "", value: 1 },
    ];
    charSheetStore.updateContent(this._id, { recollections });
  }

  setRecollectionName(index: number, name: string) {
    const recollections = [...this.charSheet.recollections];
    recollections[index] = { ...recollections[index], name };
    charSheetStore.updateContent(this._id, { recollections });
  }

  setRecollectionValue(index: number, value: number) {
    const recollections = [...this.charSheet.recollections];
    recollections[index] = { ...recollections[index], value };
    charSheetStore.updateContent(this._id, { recollections });
  }

  removeRecollection(index: number) {
    const recollections = this.charSheet.recollections.filter(
      (_, i) => i !== index
    );
    charSheetStore.updateContent(this._id, { recollections });
  }
  // #endregion

  // #region Mental Conditions
  get canCreateMentalCondition() {
    return this.charSheet.mentalConditions.length < 3;
  }

  createMentalCondition() {
    if (!this.canCreateMentalCondition) {
      return;
    }

    const mentalConditions = [
      ...this.charSheet.mentalConditions,
      {
        name: "",
        value: 1,
        isInjury: false,
      },
    ];
    charSheetStore.updateContent(this._id, { mentalConditions });
  }

  setMentalConditionName(index: number, name: string) {
    const mentalConditions = [...this.charSheet.mentalConditions];
    mentalConditions[index] = { ...mentalConditions[index], name };
    charSheetStore.updateContent(this._id, { mentalConditions });
  }

  setMentalConditionValue(index: number, value: number) {
    const mentalConditions = [...this.charSheet.mentalConditions];
    mentalConditions[index] = { ...mentalConditions[index], value };
    charSheetStore.updateContent(this._id, { mentalConditions });
  }

  setMentalConditionInjury(index: number, isInjury: boolean) {
    const mentalConditions = [...this.charSheet.mentalConditions];
    mentalConditions[index] = { ...mentalConditions[index], isInjury };
    charSheetStore.updateContent(this._id, { mentalConditions });
  }

  removeMentalCondition(index: number) {
    const mentalConditions = this.charSheet.mentalConditions.filter(
      (_, i) => i !== index
    );
    charSheetStore.updateContent(this._id, { mentalConditions });
  }
  // #endregion

  // #region Body Wounds
  get canCreateBodyWound() {
    return this.charSheet.bodyWounds.length < 6;
  }

  createBodyWound() {
    if (!this.canCreateBodyWound) {
      return;
    }

    const bodyWounds = [
      ...this.charSheet.bodyWounds,
      {
        name: "",
        value: 1,
        isInjury: false,
      },
    ];
    charSheetStore.updateContent(this._id, { bodyWounds });
  }

  setBodyWoundName(index: number, name: string) {
    const bodyWounds = [...this.charSheet.bodyWounds];
    bodyWounds[index] = { ...bodyWounds[index], name };
    charSheetStore.updateContent(this._id, { bodyWounds });
  }

  setBodyWoundValue(index: number, value: number) {
    const bodyWounds = [...this.charSheet.bodyWounds];
    bodyWounds[index] = { ...bodyWounds[index], value };
    charSheetStore.updateContent(this._id, { bodyWounds });
  }

  setBodyWoundInjury(index: number, isInjury: boolean) {
    const bodyWounds = [...this.charSheet.bodyWounds];
    bodyWounds[index] = { ...bodyWounds[index], isInjury };
    charSheetStore.updateContent(this._id, { bodyWounds });
  }

  removeBodyWound(index: number) {
    const bodyWounds = this.charSheet.bodyWounds.filter((_, i) => i !== index);
    charSheetStore.updateContent(this._id, { bodyWounds });
  }
  // #endregion

  // #region Temporal Conditions
  createTemporalCondition() {
    const temporalConditions = [
      ...this.charSheet.temporalConditions,
      { name: "", value: 1 },
    ];
    charSheetStore.updateContent(this._id, { temporalConditions });
  }

  setTemporalConditionName(index: number, name: string) {
    const temporalConditions = [...this.charSheet.temporalConditions];
    temporalConditions[index] = { ...temporalConditions[index], name };
    charSheetStore.updateContent(this._id, { temporalConditions });
  }

  setTemporalConditionValue(index: number, value: number) {
    const temporalConditions = [...this.charSheet.temporalConditions];
    temporalConditions[index] = { ...temporalConditions[index], value };
    charSheetStore.updateContent(this._id, { temporalConditions });
  }

  removeTemporalCondition(index: number) {
    const temporalConditions = this.charSheet.temporalConditions.filter(
      (_, i) => i !== index
    );
    charSheetStore.updateContent(this._id, { temporalConditions });
  }
  // #endregion

  // #region Items
  createItem() {
    const items = [...this.charSheet.items, ""];
    charSheetStore.updateContent(this._id, { items });
  }

  setItemName(index: number, name: string) {
    const items = [...this.charSheet.items];
    items[index] = name;
    charSheetStore.updateContent(this._id, { items });
  }

  removeItem(index: number) {
    const items = this.charSheet.items.filter((_, i) => i !== index);
    charSheetStore.updateContent(this._id, { items });
  }
  // #endregion

  // #region Luck
  setLuck(value: number) {
    charSheetStore.updateContent(this._id, { luck: value });
  }
  // #endregion

  // #region Notes
  setNotes(value: string) {
    charSheetStore.updateContent(this._id, { notes: value });
  }
  // #endregion
}

const list = Object.values(charSheetStore.charSheets);
export const charSheetEditorUiStore = new CharSheetEditorUiStore(list[0]?.id);
