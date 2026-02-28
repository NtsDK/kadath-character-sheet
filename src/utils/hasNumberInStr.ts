export function hasNumberInStr(str: string): boolean {
  const str2 = str.replaceAll(/\D/g, "");
  return str2 !== "";
}
