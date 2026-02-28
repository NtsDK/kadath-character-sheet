import JSZip from "jszip";
import { injectable } from "inversify";

import { VERSION } from "../constants";
import { CharSheet } from "../domain/CharSheet";
import { IExportManager } from "../ports";
import { assert } from "../utils/assert";

import { makeFileName, saveBlob } from "./fileUtils";
import { Manifest } from "./types";
import { FILES_FOLDER_NAME, MANIFEST_FILE_NAME } from "./constants";

@injectable()
export class ExportManager implements IExportManager {
  async export(charSheets: CharSheet[]): Promise<void> {
    const manifest: Manifest = {
      version: VERSION,
    };

    const zip = new JSZip();
    zip.file(MANIFEST_FILE_NAME, JSON.stringify(manifest, null, 2));

    const filesFolder = zip.folder(FILES_FOLDER_NAME);
    assert(filesFolder);

    for (const charSheet of charSheets) {
      filesFolder.file(
        `${charSheet.name}_${charSheet.id}.json`,
        JSON.stringify(charSheet, null, 2),
      );
    }

    const content = await zip.generateAsync({ type: "blob" });

    const exportFileName = makeFileName("kadath_character_sheets", "zip");
    saveBlob(content, exportFileName);
  }
}
