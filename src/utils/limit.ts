export function limit(
  value: number,
  obj: { min?: number; max?: number }
): number {
  if (obj.min !== undefined && value < obj.min) {
    return obj.min;
  }
  if (obj.max !== undefined && value > obj.max) {
    return obj.max;
  }
  return value;
}
