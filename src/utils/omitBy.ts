export const omitBy = <T>(arr: T[], ignores: T[]): T[] =>
  arr.filter((a) => ignores.every((b) => a !== b));
