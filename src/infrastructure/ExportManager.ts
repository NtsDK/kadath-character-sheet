import JSZip from "jszip";
import { inject, injectable } from "inversify";

import { VERSION } from "../constants";
import { CharSheet } from "../domain/CharSheet";
import type { IExportManager, ITempStorage } from "../ports";
import { assert } from "../utils/assert";
import { IOC_IDS } from "../IoC/Symbols";

import { makeFileName, saveBlob } from "./fileUtils";
import { CharSheetDTO, Manifest } from "./types";
import { FILES_FOLDER_NAME, MANIFEST_FILE_NAME } from "./constants";
import { chartSheetToDTO } from "./dtoUtils";
import { TempStorage } from "./TempStorage";

@injectable()
export class ExportManager implements IExportManager {
  constructor(
    @inject(IOC_IDS.TempStorage)
    public readonly tempStorage: TempStorage,
  ) {}

  async exportTempStorage(): Promise<void> {
    const dtos = await this.tempStorage.getAllDtos();
    return this.innerExport(dtos, "_tempStorage");
  }

  async export(charSheets: CharSheet[]): Promise<void> {
    return this.innerExport(charSheets.map((el) => chartSheetToDTO(el)));
  }

  async innerExport(
    charSheetDtos: CharSheetDTO[],
    archiveSuffix = "",
  ): Promise<void> {
    const manifest: Manifest = {
      version: VERSION,
    };

    const zip = new JSZip();
    zip.file(MANIFEST_FILE_NAME, JSON.stringify(manifest, null, 2));

    const filesFolder = zip.folder(FILES_FOLDER_NAME);
    assert(filesFolder);

    for (const charSheetDto of charSheetDtos) {
      filesFolder.file(
        `${charSheetDto.name}_${charSheetDto.id}.json`,
        JSON.stringify(charSheetDto, null, 2),
      );
    }

    const content = await zip.generateAsync({ type: "blob" });

    const exportFileName = makeFileName(
      "kadath_character_sheets" + archiveSuffix,
      "zip",
    );
    saveBlob(content, exportFileName);
  }
}
