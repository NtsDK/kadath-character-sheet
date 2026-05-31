export function includes<T extends readonly any[], F>(value: F, ...arr: T): value is T[number] {
  return arr.includes(value);
}
