export const getInitialDateRange = (offsetHours) => {
  const end = new Date();
  const start = new Date(end.getTime() - offsetHours * 60 * 60 * 1000);

  return [start, end];
};
