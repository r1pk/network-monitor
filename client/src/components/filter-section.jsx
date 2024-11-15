import { DateRangePicker } from './date-range-picker';

export const FilterSection = () => {
  return (
    <section className="flex justify-end">
      <DateRangePicker onDateChange={() => {}} />
    </section>
  );
};
