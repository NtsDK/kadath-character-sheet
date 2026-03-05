import { CharSheet } from "../domain/CharSheet";

export interface ITempStorage {
  init(): Promise<void>;

  getAllCharSheets(): Promise<CharSheet[]>;

  create(charSheet: CharSheet): Promise<void>;

  update(charSheet: CharSheet): Promise<void>;

  delete(id: string): Promise<void>;

  deleteAll(): Promise<void>;
}

export interface IExportManager {
  /** Экспортирует указанные листы персонажей */
  export(charSheets: CharSheet[]): void;
  /** Экспортирует данные из браузерного хранилища */
  exportTempStorage(): Promise<void>;
}

export interface IImportManager {
  import(file: File): Promise<CharSheet[]>;
}
