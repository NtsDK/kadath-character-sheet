export function generateCopyName(
  originalName: string,
  usedNames: Set<string>
): string {
  for (let i = 1; i < 100; i++) {
    const newName = `${originalName} (${i})`;
    if (usedNames.has(newName)) {
      continue;
    }
    return newName;
  }
  throw new Error("Больше 100 копий одного имени создать нельзя");
}
