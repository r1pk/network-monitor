import { DateRangePicker } from '@/components/date-range-picker';
import { useFilterContext } from '@/contexts/filter-context';

export const FilterSection = () => {
  const { setFilters } = useFilterContext();

  const handleStartDateChange = (since) => {
    setFilters((filters) => {
      return Object.assign({}, filters, { since: since });
    });
  };

  return (
    <section className="mb-4 flex justify-end">
      <DateRangePicker onStartDateChange={handleStartDateChange} />
    </section>
  );
};
