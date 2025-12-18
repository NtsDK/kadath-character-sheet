export function strToNumber(str: string): number {
  const str2 = str.replace(/\D/g, "");
  return str2 === "" ? 0 : Number(str2);
}
