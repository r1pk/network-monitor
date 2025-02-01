import { DateRangePicker } from '@/components/date-range-picker';
import { defaultContextValue, useFilterContext } from '@/contexts/filter-context';

export const FilterSection = () => {
  const { setFilters } = useFilterContext();

  const handleStartDateChange = (since) => {
    setFilters((previous) => {
      return Object.assign({}, previous, { since: since });
    });
  };

  return (
    <section className="mb-4 flex justify-end">
      <DateRangePicker defaultStartDate={defaultContextValue.filters.since} onStartDateChange={handleStartDateChange} />
    </section>
  );
};
