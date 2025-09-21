import { DateTime } from 'luxon';

export type DateRangePickerProps = {
  defaultStartDate: string;
  onStartDateChange: (date: string) => void;
};

export const DateRangePicker = ({ defaultStartDate, onStartDateChange }: DateRangePickerProps) => {
  const maxStartDate = DateTime.now().minus({ days: 1 }).toFormat('yyyy-MM-dd');
  const maxEndDate = DateTime.now().toFormat('yyyy-MM-dd');

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onStartDateChange(event.target.value);
  };

  return (
    <div className="inline-flex flex-wrap gap-2 rounded-md bg-neutral-800 px-4 py-2">
      <div className="flex flex-1 items-center gap-2">
        <span className="text-center text-xs font-bold uppercase sm:text-sm">from</span>
        <input
          type="date"
          defaultValue={defaultStartDate}
          max={maxStartDate}
          className="rounded-md bg-neutral-900 px-2 py-1 sm:text-sm"
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        <span className="text-xs font-bold uppercase sm:text-sm">to</span>
        <input
          type="date"
          defaultValue={maxEndDate}
          max={maxEndDate}
          className="rounded-md bg-neutral-900 px-2 py-1 sm:text-sm"
          disabled
        />
      </div>
    </div>
  );
};
