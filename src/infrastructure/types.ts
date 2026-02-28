import {
  BodyWound,
  Item,
  MentalCondition,
  Power,
  Project,
  Recollection,
  TemporalCondition,
  Weakness,
} from "../domain/CharSheet";

export interface Manifest {
  version: string;
}

export interface CharSheetDTO {
  name: string;
  type: "char-sheet/beyond-the-gates";
  id: string;
  updatedAt: string;
  version: string;

  powers: Power[];
  dreamlandPowers: Power[];
  weakness: Weakness;
  recollections: Recollection[];
  mentalConditions: MentalCondition[];
  bodyWounds: BodyWound[];
  temporalConditions: TemporalCondition[];
  luck: number;
  items: Item[];
  projects: Project[];
  notes: string;
}
