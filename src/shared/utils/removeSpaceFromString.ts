export const removeSpaceFromString = (str: string) =>
  str
    .split(' ')
    .filter(e => e)
    .join(' ');
