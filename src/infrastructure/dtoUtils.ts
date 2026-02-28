import { CharSheet } from "../domain/CharSheet";

import { CharSheetDTO } from "./types";

export const chartSheetToDTO = (charSheet: CharSheet): CharSheetDTO => {
  return {
    name: charSheet.name,
    type: "char-sheet/beyond-the-gates",
    id: charSheet.id,
    updatedAt: charSheet.updatedAt.toISOString(),
    version: charSheet.version,
    powers: charSheet.powers,
    dreamlandPowers: charSheet.dreamlandPowers,
    weakness: charSheet.weakness,
    recollections: charSheet.recollections,
    mentalConditions: charSheet.mentalConditions,
    bodyWounds: charSheet.bodyWounds,
    temporalConditions: charSheet.temporalConditions,
    luck: charSheet.luck,
    items: charSheet.items,
    projects: charSheet.projects,
    notes: charSheet.notes,
  };
}

export const dtoToCharSheet = (dto: CharSheetDTO): CharSheet => {
  return {
    name: dto.name,
    type: "char-sheet/beyond-the-gates",
    id: dto.id,
    updatedAt: new Date(dto.updatedAt),
    version: dto.version,
    powers: dto.powers,
    dreamlandPowers: dto.dreamlandPowers,
    weakness: dto.weakness,
    recollections: dto.recollections,
    mentalConditions: dto.mentalConditions,
    bodyWounds: dto.bodyWounds,
    temporalConditions: dto.temporalConditions,
    luck: dto.luck,
    items: dto.items,
    projects: dto.projects,
    notes: dto.notes,
  };
}
