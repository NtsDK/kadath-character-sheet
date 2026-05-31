import { action, computed, makeObservable, observable, toJS } from "mobx";
import { inject, injectable } from "inversify";
import { clone, pluck } from "ramda";

import { IOC_IDS } from "../IoC/Symbols";
import { GameStore } from "../domainServices";
import { Game } from "../domain/Game";
import { TypeMeta } from "../domain/GameDataModel";
import { getTopDataModelItem } from "../domainServices/getTopDataModelItem";
import { assert } from "../utils/assert";
import { generateCopyId, generateCopyName } from "../utils/generateCopyName";

@injectable()
export class GameEditorUiStore {
  _id: string = "";

  constructor(
    @inject(IOC_IDS.GameStore)
    public readonly gameStore: GameStore,
  ) {
    makeObservable(this, {
      _id: observable,
      game: computed,
      gameExists: computed,

      setId: action,
      // // setPlayerName: action,
      // // setCharacterName: action,
      // // powers
      // setPowerName: action,
      // createPower: action,
      // setPowerValue: action,
      // removePower: action,
      // canCreatePower: computed,
      // // dreamland powers
      // createDreamlandPower: action,
      // setDreamlandPowerName: action,
      // setDreamlandPowerValue: action,
      // removeDreamlandPower: action,
      // canCreateDreamlandPower: computed,
      // // weakness
      // setWeaknessName: action,
      // setWeaknessValue: action,
      // // recollections
      // createRecollection: action,
      // setRecollectionName: action,
      // setRecollectionValue: action,
      // removeRecollection: action,
      // canCreateRecollection: computed,
      // // mental conditions
      // createMentalCondition: action,
      // setMentalConditionName: action,
      // setMentalConditionValue: action,
      // setMentalConditionInjury: action,
      // removeMentalCondition: action,
      // canCreateMentalCondition: computed,
      // // body wounds
      // createBodyWound: action,
      // setBodyWoundName: action,
      // setBodyWoundValue: action,
      // setBodyWoundInjury: action,
      // removeBodyWound: action,
      // canCreateBodyWound: computed,
      // // temporal conditions
      // createTemporalCondition: action,
      // setTemporalConditionName: action,
      // setTemporalConditionValue: action,
      // removeTemporalCondition: action,
      // // items
      // createItem: action,
      // updateItem: action,
      // setItemCurrentStrength: action,
      // removeItem: action,
      // // luck
      // setLuck: action,
      // // projects
      // createProject: action,
      // setProjectProgress: action,
      // updateProject: action,
      // removeProject: action,
      // // notes
      // setNotes: action,
    });
  }

  get game(): Game {
    return this.gameStore.get(this._id)!;
  }

  get gameExists(): boolean {
    return this.game !== undefined;
  }

  setId(id: string) {
    this._id = id;
  }

  isItemNameUsed(name: string) {
    return this.game.dataModel.some((el) => el.name === name);
  }

  get id(): string {
    return this._id;
  }

  createModelItem(name: string, title: string, typeMeta: TypeMeta) {
    const dataModel = [...this.game.dataModel];
    const layout = [...this.game.layout];
    const modelItem = getTopDataModelItem(name, title, typeMeta);
    dataModel.push(modelItem);
    layout.push(name);
    this.gameStore.updateContent(this._id, { dataModel, layout });
  }

  copyModelItem(name: string) {
    const dataModel = [...this.game.dataModel];
    const layout = [...this.game.layout];
    const modelItem = dataModel.find((el) => el.name === name);
    assert(!!modelItem);
    const copy = clone(toJS(modelItem));
    copy.name = generateCopyId(
      modelItem.name,
      new Set(pluck("name", dataModel)),
    );
    copy.title = generateCopyName(
      modelItem.title,
      new Set(pluck("title", dataModel)),
    );
    dataModel.push(copy);
    layout.push(copy.name);
    this.gameStore.updateContent(this._id, { dataModel, layout });
  }

  deleteModelItem(name: string) {
    const dataModel = [...this.game.dataModel].filter((el) => el.name !== name);
    const layout = [...this.game.layout].filter((el) => el !== name);
    this.gameStore.updateContent(this._id, { dataModel, layout });
  }

  // get canCreatePower() {
  //   return this.charSheet.powers.length < 15;
  // }

  // // setCharacterName(name: string) {
  // //   this._charSheet.characterName = name;
  // // }

  // // setPlayerName(name: string) {
  // //   this._charSheet.playerName = name;
  // // }

  // // #region Powers

  // createPower() {
  //   if (!this.canCreatePower) {
  //     return;
  //   }

  //   const powers = [...this.charSheet.powers, { name: "", value: 1 }];
  //   this.charSheetStore.updateContent(this._id, { powers });
  // }

  // setPowerName(index: number, name: string) {
  //   const powers = [...this.charSheet.powers];
  //   powers[index] = { ...powers[index], name };
  //   this.charSheetStore.updateContent(this._id, { powers });
  // }

  // setPowerValue(index: number, value: number) {
  //   const powers = [...this.charSheet.powers];
  //   powers[index] = { ...powers[index], value };
  //   this.charSheetStore.updateContent(this._id, { powers });
  // }

  // removePower(index: number) {
  //   const powers = this.charSheet.powers.filter((_, i) => i !== index);
  //   this.charSheetStore.updateContent(this._id, { powers });
  // }

  // // #endregion

  // // #region Dreamland Powers
  // get canCreateDreamlandPower() {
  //   return this.charSheet.dreamlandPowers.length < 3;
  // }

  // createDreamlandPower() {
  //   if (!this.canCreateDreamlandPower) return;
  //   const dreamlandPowers = [
  //     ...this.charSheet.dreamlandPowers,
  //     { name: "", value: 1 },
  //   ];
  //   this.charSheetStore.updateContent(this._id, { dreamlandPowers });
  // }

  // setDreamlandPowerName(index: number, name: string) {
  //   const dreamlandPowers = [...this.charSheet.dreamlandPowers];
  //   dreamlandPowers[index] = { ...dreamlandPowers[index], name };
  //   this.charSheetStore.updateContent(this._id, { dreamlandPowers });
  // }

  // setDreamlandPowerValue(index: number, value: number) {
  //   const dreamlandPowers = [...this.charSheet.dreamlandPowers];
  //   dreamlandPowers[index] = { ...dreamlandPowers[index], value };
  //   this.charSheetStore.updateContent(this._id, { dreamlandPowers });
  // }

  // removeDreamlandPower(index: number) {
  //   const dreamlandPowers = this.charSheet.dreamlandPowers.filter(
  //     (_, i) => i !== index,
  //   );
  //   this.charSheetStore.updateContent(this._id, { dreamlandPowers });
  // }

  // // #endregion

  // // #region Weakness
  // setWeaknessName(name: string) {
  //   this.charSheetStore.updateContent(this._id, {
  //     weakness: { ...this.charSheet.weakness, name },
  //   });
  // }

  // setWeaknessValue(value: number) {
  //   this.charSheetStore.updateContent(this._id, {
  //     weakness: { ...this.charSheet.weakness, value },
  //   });
  // }
  // // #endregion

  // // #region Recollections
  // get canCreateRecollection() {
  //   return this.charSheet.recollections.length < 3;
  // }

  // createRecollection() {
  //   if (!this.canCreateRecollection) {
  //     return;
  //   }
  //   const recollections = [
  //     ...this.charSheet.recollections,
  //     { name: "", value: 1 },
  //   ];
  //   this.charSheetStore.updateContent(this._id, { recollections });
  // }

  // setRecollectionName(index: number, name: string) {
  //   const recollections = [...this.charSheet.recollections];
  //   recollections[index] = { ...recollections[index], name };
  //   this.charSheetStore.updateContent(this._id, { recollections });
  // }

  // setRecollectionValue(index: number, value: number) {
  //   const recollections = [...this.charSheet.recollections];
  //   recollections[index] = { ...recollections[index], value };
  //   this.charSheetStore.updateContent(this._id, { recollections });
  // }

  // removeRecollection(index: number) {
  //   const recollections = this.charSheet.recollections.filter(
  //     (_, i) => i !== index,
  //   );
  //   this.charSheetStore.updateContent(this._id, { recollections });
  // }
  // // #endregion

  // // #region Mental Conditions
  // get canCreateMentalCondition() {
  //   return this.charSheet.mentalConditions.length < 3;
  // }

  // createMentalCondition() {
  //   if (!this.canCreateMentalCondition) {
  //     return;
  //   }

  //   const mentalConditions = [
  //     ...this.charSheet.mentalConditions,
  //     {
  //       name: "",
  //       value: 1,
  //       isInjury: false,
  //     },
  //   ];
  //   this.charSheetStore.updateContent(this._id, { mentalConditions });
  // }

  // setMentalConditionName(index: number, name: string) {
  //   const mentalConditions = [...this.charSheet.mentalConditions];
  //   mentalConditions[index] = { ...mentalConditions[index], name };
  //   this.charSheetStore.updateContent(this._id, { mentalConditions });
  // }

  // setMentalConditionValue(index: number, value: number) {
  //   const mentalConditions = [...this.charSheet.mentalConditions];
  //   mentalConditions[index] = { ...mentalConditions[index], value };
  //   this.charSheetStore.updateContent(this._id, { mentalConditions });
  // }

  // setMentalConditionInjury(index: number, isInjury: boolean) {
  //   const mentalConditions = [...this.charSheet.mentalConditions];
  //   mentalConditions[index] = { ...mentalConditions[index], isInjury };
  //   this.charSheetStore.updateContent(this._id, { mentalConditions });
  // }

  // removeMentalCondition(index: number) {
  //   const mentalConditions = this.charSheet.mentalConditions.filter(
  //     (_, i) => i !== index,
  //   );
  //   this.charSheetStore.updateContent(this._id, { mentalConditions });
  // }
  // // #endregion

  // // #region Body Wounds
  // get canCreateBodyWound() {
  //   return this.charSheet.bodyWounds.length < 6;
  // }

  // createBodyWound() {
  //   if (!this.canCreateBodyWound) {
  //     return;
  //   }

  //   const bodyWounds = [
  //     ...this.charSheet.bodyWounds,
  //     {
  //       name: "",
  //       value: 1,
  //       isInjury: false,
  //     },
  //   ];
  //   this.charSheetStore.updateContent(this._id, { bodyWounds });
  // }

  // setBodyWoundName(index: number, name: string) {
  //   const bodyWounds = [...this.charSheet.bodyWounds];
  //   bodyWounds[index] = { ...bodyWounds[index], name };
  //   this.charSheetStore.updateContent(this._id, { bodyWounds });
  // }

  // setBodyWoundValue(index: number, value: number) {
  //   const bodyWounds = [...this.charSheet.bodyWounds];
  //   bodyWounds[index] = { ...bodyWounds[index], value };
  //   this.charSheetStore.updateContent(this._id, { bodyWounds });
  // }

  // setBodyWoundInjury(index: number, isInjury: boolean) {
  //   const bodyWounds = [...this.charSheet.bodyWounds];
  //   bodyWounds[index] = { ...bodyWounds[index], isInjury };
  //   this.charSheetStore.updateContent(this._id, { bodyWounds });
  // }

  // removeBodyWound(index: number) {
  //   const bodyWounds = this.charSheet.bodyWounds.filter((_, i) => i !== index);
  //   this.charSheetStore.updateContent(this._id, { bodyWounds });
  // }
  // // #endregion

  // // #region Temporal Conditions
  // createTemporalCondition() {
  //   const temporalConditions = [
  //     ...this.charSheet.temporalConditions,
  //     { name: "", value: 1 },
  //   ];
  //   this.charSheetStore.updateContent(this._id, { temporalConditions });
  // }

  // setTemporalConditionName(index: number, name: string) {
  //   const temporalConditions = [...this.charSheet.temporalConditions];
  //   temporalConditions[index] = { ...temporalConditions[index], name };
  //   this.charSheetStore.updateContent(this._id, { temporalConditions });
  // }

  // setTemporalConditionValue(index: number, value: number) {
  //   const temporalConditions = [...this.charSheet.temporalConditions];
  //   temporalConditions[index] = { ...temporalConditions[index], value };
  //   this.charSheetStore.updateContent(this._id, { temporalConditions });
  // }

  // removeTemporalCondition(index: number) {
  //   const temporalConditions = this.charSheet.temporalConditions.filter(
  //     (_, i) => i !== index,
  //   );
  //   this.charSheetStore.updateContent(this._id, { temporalConditions });
  // }
  // // #endregion

  // // #region Items
  // createItem(item: Item) {
  //   const items = [...this.charSheet.items, item];
  //   this.charSheetStore.updateContent(this._id, { items });
  // }

  // updateItem(index: number, item: Item) {
  //   const items = [...this.charSheet.items];
  //   items[index] = item;
  //   this.charSheetStore.updateContent(this._id, { items });
  // }

  // setItemCurrentStrength(index: number, currentStrength: number) {
  //   const items = [...this.charSheet.items];
  //   items[index] = { ...items[index], currentStrength };
  //   this.charSheetStore.updateContent(this._id, { items });
  // }

  // removeItem(index: number) {
  //   const items = this.charSheet.items.filter((_, i) => i !== index);
  //   this.charSheetStore.updateContent(this._id, { items });
  // }
  // // #endregion

  // // #region Projects
  // createProject(project: Project) {
  //   const projects = [...this.charSheet.projects, project];
  //   this.charSheetStore.updateContent(this._id, { projects });
  // }

  // setProjectProgress(index: number, progress: number) {
  //   const projects = [...this.charSheet.projects];
  //   projects[index] = { ...projects[index], progress };
  //   this.charSheetStore.updateContent(this._id, { projects });
  // }

  // updateProject(index: number, project: Project) {
  //   const projects = [...this.charSheet.projects];
  //   projects[index] = project;
  //   this.charSheetStore.updateContent(this._id, { projects });
  // }

  // removeProject(index: number) {
  //   const projects = this.charSheet.projects.filter((_, i) => i !== index);
  //   this.charSheetStore.updateContent(this._id, { projects });
  // }
  // // #endregion

  // // #region Luck
  // setLuck(value: number) {
  //   this.charSheetStore.updateContent(this._id, { luck: value });
  // }
  // // #endregion

  // // #region Notes
  // setNotes(value: string) {
  //   this.charSheetStore.updateContent(this._id, { notes: value });
  // }
  // // #endregion
}
