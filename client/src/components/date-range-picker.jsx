import { DateTime } from 'luxon';

export const DateRangePicker = ({ defaultStartDate, onStartDateChange }) => {
  const maxStartDate = DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd');
  const maxEndDate = DateTime.now().toFormat('yyyy-MM-dd');

  const handleStartDateChange = (event) => {
    onStartDateChange(event.target.value);
  };

  return (
    <div className="inline-flex items-center justify-center gap-2 rounded-md bg-neutral-800 px-2 py-1">
      <span className="text-xs font-bold uppercase sm:text-sm">Date Range</span>
      <input
        type="date"
        defaultValue={defaultStartDate}
        max={maxStartDate}
        className="rounded-md bg-neutral-900 px-2 py-1"
        onChange={handleStartDateChange}
      />
      <span className="text-xs font-bold uppercase sm:text-sm">to</span>
      <input
        type="date"
        defaultValue={maxEndDate}
        max={maxEndDate}
        className="rounded-md bg-neutral-900 px-2 py-1"
        disabled
      />
    </div>
  );
};
