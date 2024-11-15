import { DateRangePicker } from './date-range-picker';

export const FilterSection = () => {
  return (
    <section className="mb-4 flex justify-end">
      <DateRangePicker onDateChange={() => {}} />
    </section>
  );
};
