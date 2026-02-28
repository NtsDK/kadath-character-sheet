import { injectable } from "inversify";
import JSZip from "jszip";

import { IImportManager } from "../../ports";
import { assert } from "../../utils/assert";
import { CharSheet } from "../../domain/CharSheet";

import { FILES_FOLDER_NAME, MANIFEST_FILE_NAME } from "./constants";

@injectable()
export class ImportManager implements IImportManager {
  async import(file: File): Promise<CharSheet[]> {
    const zip = await JSZip.loadAsync(file);

    const manifestFile = zip.file(MANIFEST_FILE_NAME);
    assert(manifestFile, "manifest.json not found in the zip file");
    const manifestContent = await manifestFile.async("string");
    JSON.parse(manifestContent); // TODO: validate manifest content

    const filesFolder = zip.folder(FILES_FOLDER_NAME);
    assert(filesFolder, "files folder not found in the zip file");

    const files: JSZip.JSZipObject[] = [];

    // eslint-disable-next-line unicorn/no-array-for-each
    filesFolder.forEach(async (_relativePath, file) => {
      files.push(file);
    });

    const fileContents = await Promise.all(files.map(file => file.async("string")));

    // TODO: validate file contents
    const charSheets: CharSheet[] = fileContents.map(str => JSON.parse(str));
    // console.log(charSheets);
    return charSheets;
  }
}
