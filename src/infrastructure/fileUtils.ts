import { DateTime } from "luxon";

// eslint-disable-next-line no-useless-escape
const illegalRe = /[\/\?<>\\:\*\|":]/g;
// eslint-disable-next-line no-control-regex
const controlRe = /[\u0000-\u001F\u0080-\u009F]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
// eslint-disable-next-line no-useless-escape
const windowsTrailingRe = /[\. ]+$/;

function sanitizeStr2FileName(input: string, replacement = ""): string {
  // replacement = replacement || '';
  const sanitized = input
    .replaceAll(illegalRe, replacement)
    .replaceAll(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return sanitized.slice(0, 255);
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
  const url = globalThis.URL.createObjectURL(blob);
  saveFile(url, filename);
  globalThis.URL.revokeObjectURL(url);
}

export function saveFile(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
}
