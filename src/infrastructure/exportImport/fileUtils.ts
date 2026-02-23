import { DateTime } from "luxon";

// export const readTextFile = (evt: any) =>
//   new Promise<string | ArrayBuffer | null>((resolve, reject) => {
//     // Retrieve the first (and only!) File from the FileList object
//     const f = evt.target.files[0];

//     if (f) {
//       const r = new FileReader();
//       r.onload = function (this: FileReader, e: ProgressEvent<FileReader>) {
//         if (e.target === null) {
//           reject(new Error("File reader target is null"));
//         } else {
//           resolve(e.target.result);
//         }
//       };
//       r.readAsText(f);
//     } else {
//       reject(new Error("utils-base-file-loading-error"));
//     }
//   });
// export const readJsonFile = (evt: any) =>
//   new Promise((resolve, reject) => {
//     // Retrieve the first (and only!) File from the FileList object
//     const f = evt.target.files[0];

//     if (f) {
//       const r = new FileReader();
//       r.onload = function (this: FileReader, e: ProgressEvent<FileReader>) {
//         if (e.target === null) {
//           reject(new Error("File reader target is null"));
//         } else {
//           const contents = e.target.result;
//           try {
//             const object = JSON.parse(contents as string);
//             resolve(object);
//           } catch (err) {
//             reject(err);
//           }
//         }
//       };
//       r.readAsText(f);
//     } else {
//       // UI.alert(L10n.getValue('utils-base-file-loading-error'));
//       reject(new Error("utils-base-file-loading-error"));
//     }
//   });

// export const readBinaryFile = (evt: any) =>
//   new Promise((resolve, reject) => {
//     // Retrieve the first (and only!) File from the FileList object
//     const f = evt.target.files[0];

//     if (f) {
//       const r = new FileReader();
//       r.onload = function (this: FileReader, e: ProgressEvent<FileReader>) {
//         if (e.target === null) {
//           reject(new Error("File reader target is null"));
//         } else {
//           const contents = e.target.result;
//           resolve({
//             name: f.name,
//             buffer: contents,
//           });
//         }
//       };
//       r.readAsArrayBuffer(f);
//     } else {
//       // UI.alert(L10n.getValue('utils-base-file-loading-error'));
//       reject(new Error("utils-base-file-loading-error"));
//     }
//   });

// eslint-disable-next-line no-useless-escape
const illegalRe = /[\/\?<>\\:\*\|":]/g;
// eslint-disable-next-line no-control-regex
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
// eslint-disable-next-line no-useless-escape
const windowsTrailingRe = /[\. ]+$/;

function sanitizeStr2FileName(input: string, replacement = ""): string {
  // replacement = replacement || '';
  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return sanitized.substring(0, 255);
}

export function makeFileName(
  root: string,
  extension: string,
  date?: Date,
): string {
  date = date || new Date();
  const timeStr = DateTime.fromJSDate(date).toFormat("dd-LLL-yyyy_HH-MM-ss", {
    locale: "en",
  });
  // const timeStr = dateFormat(date, 'dd-mmm-yyyy_HH-MM-ss');
  const fileName = `${root}_${timeStr}`;
  return `${sanitizeStr2FileName(fileName)}.${extension}`;
}

export function json2File(obj: any, fileName: string) {
  str2File(JSON.stringify(obj, null, "  "), fileName);
}

export function str2File(str: any, fileName: string) {
  const blob = new Blob([str], {
    type: "text/plain;charset=utf-8",
  });
  saveBlob(blob, fileName);
}

export function saveBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  saveFile(url, filename);
  window.URL.revokeObjectURL(url);
}

export function saveFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
