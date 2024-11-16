import { DateTime } from 'luxon';

export const DateRangePicker = ({ onStartDateChange }) => {
  const start = DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd');
  const end = DateTime.now().toFormat('yyyy-MM-dd');

  const handleStartDateChange = (event) => {
    onStartDateChange(event.target.value);
  };

  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-800 px-2 py-1">
      <span className="text-sm font-bold uppercase">Date Range</span>
      <input type="date" max={start} className="rounded-md bg-neutral-900 px-2 py-1" onChange={handleStartDateChange} />
      <span className="text-sm font-bold uppercase">to</span>
      <input type="date" value={end} className="rounded-md bg-neutral-900 px-2 py-1" disabled />
    </div>
  );
};
