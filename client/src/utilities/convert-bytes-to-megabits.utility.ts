export const convertBytesToMegabits = (bytes: number): number => {
  return Math.round(bytes / 125000);
};
