import type { CharSheet } from "../domain/CharSheet";

export type ImportStrategy = "skip" | "create" | "replace";

export type ConflictInfo = {
  name: string;
  existingCharSheet: CharSheet;
  importingCharSheet: CharSheet;
  importStrategy: ImportStrategy;
};
