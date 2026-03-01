import { inject, injectable } from "inversify";
import JSZip from "jszip";
import { validate } from "uuid";

import { IImportManager } from "../ports";
import { assert } from "../utils/assert";
import { CharSheet } from "../domain/CharSheet";
import { IOC_IDS } from "../IoC/Symbols";
import { NotificationStore } from "../domainServices/NotificationStore";

import { FILES_FOLDER_NAME, MANIFEST_FILE_NAME } from "./constants";
import { validateCharSheetDTO, validateManifest } from "./validation";
import { CharSheetDTO } from "./types";
import { dtoToCharSheet } from "./dtoUtils";

@injectable()
export class ImportManager implements IImportManager {
  constructor(
    @inject(IOC_IDS.NotificationStore)
    public readonly notificationStore: NotificationStore,
  ) {}

  async import(file: File): Promise<CharSheet[]> {
    let zip: JSZip;
    try {
      zip = await JSZip.loadAsync(file);
    } catch {
      this.notificationStore.notify({
        type: "error",
        message: "Ошибка при чтении архива",
        description: "Не удалось прочитать zip файл.",
        duration: 0,
      });
      throw new Error("Не удалось прочитать zip файл.");
    }

    const version = await this.getVersionFromManifest(zip);

    const charSheetDTOs = await this.getCharSheetDTOs(zip, version);
    return charSheetDTOs.map((dto) => dtoToCharSheet(dto));
  }

  private async getVersionFromManifest(zip: JSZip): Promise<string> {
    const manifestFile = zip.file(MANIFEST_FILE_NAME);
    if (!manifestFile) {
      this.notificationStore.notify({
        type: "error",
        message: "Ошибка при чтении архива",
        description: "В архиве отсутствует manifest.json.",
        duration: 0,
      });
      throw new Error("В архиве отсутствует manifest.json.");
    }
    const manifestContent = await manifestFile.async("string");
    try {
      const manifest = JSON.parse(manifestContent);
      if (!validateManifest(manifest)) {
        console.error(
          "Ошибка разбора манифеста",
          JSON.stringify(validateManifest.errors, null, "  "),
        );
        throw new Error("manifest.json contains invalid data.");
      }
      return manifest.version;
    } catch {
      this.notificationStore.notify({
        type: "error",
        message: "Ошибка при чтении архива",
        description: "Некорректный формат manifest.json.",
        duration: 0,
      });
      throw new Error("manifest.json contains invalid data.");
    }
  }

  private async getCharSheetDTOs(
    zip: JSZip,
    version: string,
  ): Promise<CharSheetDTO[]> {
    const filesFolder = zip.folder(FILES_FOLDER_NAME);
    if (!filesFolder) {
      this.notificationStore.notify({
        type: "error",
        message: "Ошибка при чтении архива",
        description: "В архиве отсутствует папка с листами персонажей.",
        duration: 0,
      });
      throw new Error("В архиве отсутствует папка с листами персонажей.");
    }

    const files: { relativePath: string; file: JSZip.JSZipObject }[] = [];

    // eslint-disable-next-line unicorn/no-array-for-each
    filesFolder.forEach(async (relativePath, file) => {
      files.push({ relativePath, file });
    });

    const charSheetDTOs: CharSheetDTO[] = [];

    for (const { relativePath, file } of files) {
      const content = await file.async("string");

      let charSheetDTO: any;
      try {
        charSheetDTO = JSON.parse(content);
      } catch {
        this.notificationStore.notify({
          type: "error",
          message: "Ошибка при чтении архива",
          description: `Ошибка разбора листа персонажа ${relativePath}`,
          duration: 0,
        });
        throw new Error(`Ошибка разбора листа персонажа ${relativePath}`);
      }
      if (!validateCharSheetDTO(charSheetDTO)) {
        console.error(
          `Ошибка разбора листа персонажа ${relativePath}`,
          JSON.stringify(validateCharSheetDTO.errors, null, "  "),
        );
        this.notificationStore.notify({
          type: "error",
          message: "Ошибка при чтении архива",
          description: `Ошибка разбора листа персонажа ${relativePath}`,
          duration: 0,
        });
        throw new Error(`Ошибка разбора листа персонажа ${relativePath}`);
      }
      charSheetDTOs.push(charSheetDTO);
    }
    return charSheetDTOs;
  }
}
