import { ChartSection } from '@/components/chart-section';
import { FilterSection } from '@/components/filter-section';
import { HeaderTitle } from '@/components/header-title';

export const Dashboard = () => {
  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <HeaderTitle title="Dashboard" />
      </header>
      <FilterSection />
      <ChartSection />
    </main>
  );
};
