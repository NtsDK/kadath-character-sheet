import { action, computed, makeObservable, observable, reaction } from "mobx";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";
import { strToNumber } from "../utils/strToNumber";
import { PostActionEffect } from "../domain/PostActionEffect";

export class CharSheetActionsUiStore {
  _selectedPowers = new Set<number>();
  _selectedDreamlandPowers = new Set<number>();
  _selectedMentalCondition: null | number = null;
  _selectedBodyWounds = new Set<number>();
  _selectedTemporalConditions = new Set<number>();
  _applyWeakness = false;
  _otherConditionEffect: number = 0;
  _selectedItems = new Set<number>();
  _useLuckPoints: number = 0;
  _rawDiceRollResult: number[] = [];
  _postActionEffects: PostActionEffect[] = [];

  constructor() {
    makeObservable(this, {
      _selectedPowers: observable,
      _selectedDreamlandPowers: observable,
      _applyWeakness: observable,
      _selectedMentalCondition: observable,
      _selectedBodyWounds: observable,
      _selectedTemporalConditions: observable,
      _otherConditionEffect: observable,
      _selectedItems: observable,
      _useLuckPoints: observable,

      _rawDiceRollResult: observable,
      _postActionEffects: observable,

      togglePowerSelection: action,
      toggleDreamlandPowerSelection: action,

      checkedValues: computed,
      diceRollResult: computed,
      rollDices: action,
      newAction: action,
      toggleApplyWeakness: action,
      selectMentalCondition: action,
    });

    reaction(
      () => charSheetEditorUiStore.charSheet?.powers.length,
      () => {
        this._selectedPowers.clear();
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.dreamlandPowers.length,
      () => {
        this._selectedDreamlandPowers.clear();
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.mentalConditions.length,
      () => {
        this._selectedMentalCondition = null;
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.bodyWounds.length,
      () => {
        this._selectedBodyWounds.clear();
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.temporalConditions.length,
      () => {
        this._selectedTemporalConditions.clear();
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.items.length,
      () => {
        this._selectedItems.clear();
      }
    );
    reaction(
      () => charSheetEditorUiStore.charSheet?.luck,
      () => {
        this._useLuckPoints = 0;
      }
    );
  }

  get id() {
    return charSheetEditorUiStore.charSheet.id;
  }

  get powers() {
    return charSheetEditorUiStore.charSheet.powers;
  }

  get selectedPowers() {
    return this._selectedPowers;
  }

  get dreamlandPowers() {
    return charSheetEditorUiStore.charSheet.dreamlandPowers;
  }

  get selectedDreamlandPowers() {
    return this._selectedDreamlandPowers;
  }

  get weakness() {
    return charSheetEditorUiStore.charSheet.weakness;
  }

  get applyWeakness() {
    return this._applyWeakness;
  }

  get mentalConditions() {
    return charSheetEditorUiStore.charSheet.mentalConditions;
  }

  get selectedMentalCondition() {
    return this._selectedMentalCondition;
  }

  get bodyWounds() {
    return charSheetEditorUiStore.charSheet.bodyWounds;
  }

  get selectedBodyWounds() {
    return this._selectedBodyWounds;
  }

  get temporalConditions() {
    return charSheetEditorUiStore.charSheet.temporalConditions;
  }

  get selectedTemporalConditions() {
    return this._selectedTemporalConditions;
  }

  get otherConditionEffect() {
    return this._otherConditionEffect;
  }

  get items() {
    return charSheetEditorUiStore.charSheet.items;
  }

  get selectedItems() {
    return this._selectedItems;
  }

  get luck() {
    return charSheetEditorUiStore.charSheet.luck;
  }

  get useLuckPoints() {
    return this._useLuckPoints;
  }

  get diceRollResult() {
    return {
      rawDiceRollResult: this._rawDiceRollResult,
      successCount: this.successCount,
      isFiasco: this.isFiasco,
    };
  }

  get successCount() {
    return this._rawDiceRollResult.filter((v) => v >= 5).length;
  }

  get isFiasco() {
    return this.successCount === 0 && this._rawDiceRollResult.length > 0;
  }

  get postActionEffects() {
    return this._postActionEffects;
  }

  newAction() {
    this._selectedPowers.clear();
    this._selectedDreamlandPowers.clear();
    this._applyWeakness = false;
    this._selectedMentalCondition = null;
    this._selectedBodyWounds.clear();
    this._selectedTemporalConditions.clear();
    this._otherConditionEffect = 0;
    this._selectedItems.clear();
    this._useLuckPoints = 0;
    this._rawDiceRollResult = [];
    this._postActionEffects = [];
  }

  rollDices() {
    const { sum } = this.checkedValues;
    if (sum <= 0) {
      this._rawDiceRollResult = [];
    } else {
      this._rawDiceRollResult = new Array(sum)
        .fill(0)
        .map(() => Math.floor(Math.random() * 6) + 1);
      this._rawDiceRollResult.sort().reverse();
    }
    this._postActionEffects = [];
    if (this.selectedMentalConditionObject) {
      this._postActionEffects.push("weakenMentalCondition");
    }
    if(this._useLuckPoints > 0) {
      this._postActionEffects.push("deductLuckPoints");
    }
    if(this._applyWeakness) {
      if (!this.isFiasco) {
        if (this.weakness.value == 5) {
          this._postActionEffects.push("overcomingWeakness");
        } else {
          this._postActionEffects.push("increaseWeakness");
        }
      } else {
        this._postActionEffects.push("fiascoWeaknessReset");
      }
    }
  }

  toggleApplyWeakness() {
    this._applyWeakness = !this._applyWeakness;
  }

  togglePowerSelection(index: number) {
    if (this._selectedPowers.has(index)) {
      this._selectedPowers.delete(index);
    } else {
      this._selectedPowers.add(index);
    }
  }

  toggleDreamlandPowerSelection(index: number) {
    if (this._selectedDreamlandPowers.has(index)) {
      this._selectedDreamlandPowers.delete(index);
    } else {
      this._selectedDreamlandPowers.add(index);
    }
  }

  toggleBodyWoundSelection(index: number) {
    if (this._selectedBodyWounds.has(index)) {
      this._selectedBodyWounds.delete(index);
    } else {
      this._selectedBodyWounds.add(index);
    }
  }

  toggleTemporalConditionSelection(index: number) {
    if (this._selectedTemporalConditions.has(index)) {
      this._selectedTemporalConditions.delete(index);
    } else {
      this._selectedTemporalConditions.add(index);
    }
  }

  toggleItemSelection(index: number) {
    if (this._selectedItems.has(index)) {
      this._selectedItems.delete(index);
    } else {
      this._selectedItems.add(index);
    }
  }

  changeOtherConditionEffect(value: number) {
    this._otherConditionEffect = value;
  }

  changeUseLuckPoints(value: number) {
    this._useLuckPoints = value;
  }

  selectMentalCondition(index: number | null) {
    this._selectedMentalCondition = index;
  }

  get selectedMentalConditionObject() {
    if (this._selectedMentalCondition === null) {
      return null;
    }
    return this.mentalConditions[this._selectedMentalCondition];
  }

  get checkedValues() {
    const values: number[] = [];

    const powerIndexes = Array.from(this._selectedPowers);
    powerIndexes.sort();
    powerIndexes.forEach((index) => {
      const power = this.powers[index];
      values.push(power.value);
    });

    const dreamlandPowerIndexes = Array.from(this._selectedDreamlandPowers);
    dreamlandPowerIndexes.sort();
    dreamlandPowerIndexes.forEach((index) => {
      const power = this.dreamlandPowers[index];
      values.push(power.value);
    });

    if (this._applyWeakness) {
      values.push(-this.weakness.value);
    }

    if (this.selectedMentalConditionObject) {
      values.push(this.selectedMentalConditionObject.value);
    }

    const bodyWoundIndexes = Array.from(this._selectedBodyWounds);
    bodyWoundIndexes.sort();
    bodyWoundIndexes.forEach((index) => {
      const wound = this.bodyWounds[index];
      values.push(wound.value);
    });

    const temporalConditionIndexes = Array.from(
      this._selectedTemporalConditions
    );
    temporalConditionIndexes.sort();
    temporalConditionIndexes.forEach((index) => {
      const condition = this.temporalConditions[index];
      values.push(condition.value);
    });

    if (this._otherConditionEffect !== 0) {
      values.push(this._otherConditionEffect);
    }

    const itemIndexes = Array.from(this._selectedItems);
    itemIndexes.sort();
    itemIndexes.forEach((index) => {
      const number = strToNumber(this.items[index]);
      if (number !== 0) {
        values.push(number);
      }
    });

    if (this._useLuckPoints !== 0) {
      values.push(this._useLuckPoints);
    }

    return {
      values,
      sum: values.reduce((a, b) => a + b, 0),
    };
  }
}

export const charSheetActionsUiStore = new CharSheetActionsUiStore();
