import { action, computed, makeObservable, observable, toJS } from "mobx";
import { clone } from "ramda";
import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";
import * as R from "ramda";

import { assert } from "../utils/assert";
import { generateCopyId, generateCopyName } from "../utils/generateCopyName";
import {
  CharSheet,
  CharSheetContent,
  CharSheetMeta,
} from "../domain/CharSheet";
import { IOC_IDS } from "../IoC/Symbols";
import type { ITempStorage } from "../ports";
import { Game, GameContent, GameMeta, GameSupplemental } from "../domain/Game";

import { getNewCharSheet } from "./charSheet";
import { getNewGame } from "./game";

@injectable()
export class GameStore {
  _games: Record<string, Game> = {};

  constructor(
    @inject(IOC_IDS.TempStorage)
    public readonly tempStorage: ITempStorage,
  ) {
    makeObservable(this, {
      _games: observable,
      games: computed,
      create: action,
      insert: action,
      init: action,
      copy: action,
      delete: action,
      deleteAll: action,
      updateMeta: action,
      updateContent: action,
      updateSupplemental: action,
    });
  }

  get games(): Record<string, Game> {
    return this._games;
  }

  // #region getters
  get(id: string): Game | undefined {
    return this._games[id];
  }

  getAll(): Game[] {
    return Object.values(this._games);
  }

  exists(id: string): boolean {
    return !!this._games[id];
  }

  isNameUsed(name: string): boolean {
    return Object.values(this._games).some((el) => el.name === name);
  }

  isIdUsed(id: string): boolean {
    return Object.values(this._games).some((el) => el.id === id);
  }
  // #endregion

  // #region actions

  init(games: Game[]): void {
    for (const game of games) {
      this._games[game.id] = game;
    }
  }

  create(name: string, id: string): void {
    if (this.isNameUsed(name)) {
      return;
    }
    const newGame = getNewGame();
    newGame.name = name;
    newGame.id = id;
    this._games[newGame.id] = newGame;
    // this.tempStorage.create(newGame);
  }

  /** Используется при импорте данных */
  insert(game: Game, strategy: "replace" | "create"): void {
    if (strategy === "create") {
      if (this.isNameUsed(game.name)) {
        game.name = generateCopyName(
          game.name,
          new Set(R.pluck("name", Object.values(this._games))),
        );
      }
      if (this.isIdUsed(game.id)) {
        game.id = generateCopyId(
          game.id,
          new Set(R.pluck("id", Object.values(this._games))),
        );
      }
      this._games[game.id] = game;
      // this.tempStorage.create(toJS(game));
    } else {
      const currentGame = Object.values(this._games).find(
        (el) => el.name === game.name,
      );
      assert(currentGame);
      game.id = currentGame.id;
      this._games[game.id] = game;
      // this.tempStorage.update(toJS(game));
    }
  }

  copy(id: string): void {
    const original = this.get(id);
    assert(!!original);
    const copy = clone(toJS(original));
    copy.id = generateCopyId(
      copy.id,
      new Set(R.pluck("id", Object.values(this._games))),
    );
    copy.name = generateCopyName(
      original.name,
      new Set(Object.values(this._games).map((el) => el.name)),
    );
    this._games[copy.id] = copy;
    // this.tempStorage.create(copy);
  }

  delete(id: string): void {
    delete this._games[id];
    // this.tempStorage.delete(id);
  }

  deleteAll(): void {
    this._games = {};
    // this.tempStorage.deleteAll();
  }

  updateMeta(id: string, gamePatch: Partial<GameMeta>) {
    const newId = gamePatch.id ?? id;
    const game = this._games[id];
    delete this._games[id];
    this._games[newId] = {
      ...game,
      ...gamePatch,
    };
    // this.tempStorage.update(toJS(this._charSheets[id]));
  }

  updateContent(id: string, gamePatch: Partial<GameContent>) {
    this._games[id] = {
      ...this._games[id],
      ...gamePatch,
    };
    // this.tempStorage.update(toJS(this._charSheets[id]));
  }

  updateSupplemental(id: string, gamePatch: Partial<GameSupplemental>) {
    this._games[id] = {
      ...this._games[id],
      ...gamePatch,
    };
    // this.tempStorage.update(toJS(this._charSheets[id]));
  }
  // #endregion
}
