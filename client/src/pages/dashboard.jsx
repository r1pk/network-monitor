import { useState } from 'react';

import { ChartSection } from '@/components/chart-section';
import { FilterSection } from '@/components/filter-section';
import { HeaderTitle } from '@/components/header-title';
import { defaultContextValue, FilterContext } from '@/contexts/filter-context';

export const Dashboard = () => {
  const [filters, setFilters] = useState(defaultContextValue.filters);

  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <HeaderTitle title="Dashboard" />
      </header>
      <FilterContext.Provider value={{ filters: filters, setFilters: setFilters }}>
        <FilterSection />
        <ChartSection />
      </FilterContext.Provider>
    </main>
  );
};
