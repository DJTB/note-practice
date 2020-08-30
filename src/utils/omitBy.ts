export const omitBy = (arr: string[], ignores: string[]) =>
  arr.filter((a) => ignores.every((b) => a !== b));
