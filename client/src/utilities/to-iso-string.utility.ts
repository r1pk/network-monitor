export const toISOString = (value: string): string => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date string: ${value}`);
  }

  return date.toISOString();
};
