export const createDateRange = ({ startOffsetHours = 0, endOffsetHours = 0, date = new Date() }) => {
  const start = new Date(date.getTime() + startOffsetHours * 60 * 60 * 1000);
  const end = new Date(date.getTime() + endOffsetHours * 60 * 60 * 1000);

  return [start, end];
};
