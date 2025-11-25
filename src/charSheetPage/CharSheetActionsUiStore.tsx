import { action, computed, makeObservable, observable, reaction } from "mobx";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";

export class CharSheetActionsUiStore {
  _selectedPowers = new Set<number>();
  _selectedDreamlandPowers = new Set<number>();
  _rawDiceRollResult: number[] = [];

  constructor() {
    makeObservable(this, {
      _selectedPowers: observable,
      _selectedDreamlandPowers: observable,
      _rawDiceRollResult: observable,
      togglePowerSelection: action,

      checkedValues: computed,
      diceRollResult: computed,
      rollDices: action,
      newAction: action,
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
  }

  get id() {
    return charSheetEditorUiStore.charSheet.id;
  }

  get powers() {
    return charSheetEditorUiStore.charSheet.powers;
  }

  get dreamlandPowers() {
    return charSheetEditorUiStore.charSheet.dreamlandPowers;
  }

  get selectedPowers() {
    return this._selectedPowers;
  }

  get selectedDreamlandPowers() {
    return this._selectedDreamlandPowers;
  }

  get diceRollResult() {
    const successCount = this._rawDiceRollResult.filter((v) => v >= 5).length;
    return {
      rawDiceRollResult: this._rawDiceRollResult,
      successCount,
      isFiasco: successCount === 0 && this._rawDiceRollResult.length > 0,
    };
  }

  newAction() {
    this._selectedPowers.clear();
    this._selectedDreamlandPowers.clear();
    this._rawDiceRollResult = [];
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
    return {
      values,
      sum: values.reduce((a, b) => a + b, 0),
    };
  }
}

export const charSheetActionsUiStore = new CharSheetActionsUiStore();
