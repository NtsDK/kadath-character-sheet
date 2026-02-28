import { injectable } from "inversify";
import { openDB, deleteDB, IDBPDatabase } from "idb";

import { CharSheet } from "../domain/CharSheet";
import {
  ClaudiaCharSheet,
  ClaudiaCharSheet2,
  getNewDefinedCharSheet,
} from "../domainServices/charSheet";
import { ITempStorage } from "../ports";

const DB_NAME = "KadathDB";
const DB_VERSION = 1;
const FILES_STORE = "files";

@injectable()
export class TempStorage implements ITempStorage {
  db!: IDBPDatabase;

  async init(): Promise<void> {
    let initializeFilesStore = false;
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(FILES_STORE)) {
          db.createObjectStore(FILES_STORE, { keyPath: "id" });
          initializeFilesStore = true;
        }
      },
    });

    if (initializeFilesStore) {
      this.create(ClaudiaCharSheet());
      this.create(ClaudiaCharSheet2());
      this.create(getNewDefinedCharSheet());
    }
  }

  async getAllCharSheets(): Promise<CharSheet[]> {
    return openDB(DB_NAME, DB_VERSION).then((db) => {
      return db.getAll(FILES_STORE);
    });
  }

  async create(charSheet: CharSheet): Promise<void> {
    await this.db.add(FILES_STORE, charSheet);
  }

  async update(charSheet: CharSheet): Promise<void> {
    await this.db.put(FILES_STORE, charSheet);
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
