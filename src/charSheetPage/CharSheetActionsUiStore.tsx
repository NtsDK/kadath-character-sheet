import { action, computed, makeObservable, observable } from "mobx";
import { charSheetEditorUiStore } from "./CharSheetEditorUiStore";

export class CharSheetActionsUiStore {
  _selectedPowers = new Set<number>();
  _diceRollResult: number[] = [];

  constructor() {
    makeObservable(this, {
      _selectedPowers: observable,
      _diceRollResult: observable,
      togglePowerSelection: action,

      checkedValues: computed,
      rollDices: action,
    });
  }

  get id() {
    return charSheetEditorUiStore.charSheet.id;
  }

  get powers() {
    return charSheetEditorUiStore.charSheet.powers;
  }

  get diceRollResult() {
    return this._diceRollResult;
  }

  rollDices() {
    const { sum } = this.checkedValues;
    if (sum <= 0) {
      this._diceRollResult = [];
    } else {
      this._diceRollResult = new Array(sum).fill(0).map(
        () => Math.floor(Math.random() * 6) + 1
      );
      this._diceRollResult.sort().reverse();
    }
  }

  togglePowerSelection(index: number) {
    if (this._selectedPowers.has(index)) {
      this._selectedPowers.delete(index);
    } else {
      this._selectedPowers.add(index);
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
    return {
      values,
      sum: values.reduce((a, b) => a + b, 0),
    };
  }
}

export const charSheetActionsUiStore = new CharSheetActionsUiStore();
