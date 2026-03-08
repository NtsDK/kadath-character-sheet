import { inject, injectable } from "inversify";
import { openDB, deleteDB, IDBPDatabase } from "idb";

import { CharSheet } from "../domain/CharSheet";
import { ITempStorage } from "../ports";
import { IOC_IDS } from "../IoC/Symbols";
import { NotificationStore } from "../domainServices/NotificationStore";

import { chartSheetToDTO, dtoToCharSheet } from "./dtoUtils";
import { CharSheetDTO } from "./types";
import { validateCharSheetDTO } from "./validation";

const DB_NAME = "KadathDB";
const DB_VERSION = 1;
const FILES_STORE = "files";

type KadathDBSchema = {
  [FILES_STORE]: {
    key: IDBValidKey;
    value: CharSheetDTO;
  };
};

@injectable()
export class TempStorage implements ITempStorage {
  db!: IDBPDatabase<KadathDBSchema>;

  constructor(
    @inject(IOC_IDS.NotificationStore)
    public readonly notificationStore: NotificationStore,
  ) {}

  async init(): Promise<void> {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(FILES_STORE)) {
          db.createObjectStore(FILES_STORE, { keyPath: "id" });
        }
      },
    });
  }

  async getAllCharSheets(): Promise<CharSheet[]> {
    const dtos = await this.getAllDtos();
    const charSheets: CharSheet[] = [];
    for (const dto of dtos) {
      if (validateCharSheetDTO(dto)) {
        charSheets.push(dtoToCharSheet(dto));
      } else {
        // @ts-expect-error - ожидаем, что в dto есть имя
        const name = dto?.name;
        console.error(
          `Ошибка загрузки листа персонажа ${name}`,
          JSON.stringify(validateCharSheetDTO.errors, null, "  "),
        );
        this.notificationStore.notify({
          type: "error",
          message: "Ошибка загрузки из браузера",
          description: `Ошибка загрузки листа персонажа ${name}`,
          duration: 0,
        });
      }
    }
    return charSheets;
  }

  /** внутренний метод инфраструктуры, не должен быть в интерфейсе ITempStorage */
  async getAllDtos(): Promise<CharSheetDTO[]> {
    return openDB<KadathDBSchema>(DB_NAME, DB_VERSION).then(async (db) => {
      return await db.getAll(FILES_STORE);
    });
  }

  async create(charSheet: CharSheet): Promise<void> {
    await this.db.add(FILES_STORE, chartSheetToDTO(charSheet));
  }

  async update(charSheet: CharSheet): Promise<void> {
    await this.db.put(FILES_STORE, chartSheetToDTO(charSheet));
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(FILES_STORE, id);
  }

  async deleteAll(): Promise<void> {
    await this.db.clear(FILES_STORE);
  }

  async dropDB() {
    return deleteDB(DB_NAME);
  }
}
