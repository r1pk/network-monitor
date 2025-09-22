import { useState } from 'react';

import { ChartSection } from '@/components/chart-section';
import { FilterSection } from '@/components/filter-section';
import { ParameterSection } from '@/components/parameter-section';
import type { Filters } from '@/contexts/filter-context';
import { defaultContextValue, FilterContext } from '@/contexts/filter-context';

export const Dashboard = () => {
  const [filters, setFilters] = useState<Filters>(defaultContextValue.filters);

  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <h2 className="flex items-center gap-x-2">
          <span className="text-lg font-bold uppercase">network-monitor</span>
          <span>::</span>
          <span className="font-medium uppercase">dashboard</span>
        </h2>
      </header>
      <div className="flex flex-col gap-4">
        <FilterContext.Provider value={{ filters: filters, setFilters: setFilters }}>
          <ParameterSection />
          <FilterSection />
          <ChartSection />
        </FilterContext.Provider>
      </div>
    </main>
  );
};
