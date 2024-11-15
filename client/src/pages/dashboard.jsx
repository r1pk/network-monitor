import { FilterSection } from '@/components/filter-section';
import { HeaderTitle } from '@/components/header-title';

export const Dashboard = () => {
  return (
    <main className="container mx-auto p-4">
      <header>
        <HeaderTitle title="Dashboard" />
      </header>
      <FilterSection />
    </main>
  );
};
