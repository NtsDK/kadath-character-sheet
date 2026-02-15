export function hasNumberInStr(str: string): boolean {
  const str2 = str.replace(/\D/g, "");
  return str2 !== "";
}
