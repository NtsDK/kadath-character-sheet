import type { Game } from "../domain/Game";

import { dataModel } from "./dataModel";


export const configuration: Game = {
  name:"По ту сторону Врат",
  id: "beyond-the-gates",
  version: 1,
  dataModel,
  layout: [],
  // characterCollections: [],
  // gearItemCollections:[]
}
