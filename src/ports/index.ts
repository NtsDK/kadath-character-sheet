import { CharSheet } from "../domain/CharSheet";

export interface ITempStorage {
  init(): Promise<void>;

  getAllCharSheets(): Promise<CharSheet[]>;

  create(charSheet: CharSheet): Promise<void>;

  update(charSheet: CharSheet): Promise<void>;

  delete(id: string): Promise<void>;
}
