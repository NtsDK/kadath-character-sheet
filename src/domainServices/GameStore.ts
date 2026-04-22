import { action, computed, makeObservable, observable, toJS } from "mobx";
import { clone } from "ramda";
import { v4 as uuid } from "uuid";
import { inject, injectable } from "inversify";
import * as R from "ramda";

import { assert } from "../utils/assert";
import { generateCopyName } from "../utils/generateCopyName";
import {
  CharSheet,
  CharSheetContent,
  CharSheetMeta,
} from "../domain/CharSheet";
import { IOC_IDS } from "../IoC/Symbols";
import type { ITempStorage } from "../ports";

import { getNewCharSheet } from "./charSheet";

@injectable()
export class GameStore {
  _games: Record<string, CharSheet> = {};

}
