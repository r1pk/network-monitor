import { AnalyticsCard } from '@/components/analytics-card';
import { Skeleton } from '@/components/skeleton';
import { useFilterContext } from '@/contexts/filter-context';
import { useAverageSnapshot } from '@/hooks/use-average-snapshot';
import { convertBytesToMegabits } from '@/utils/convert-bytes-to-megabits';

export const AnalyticsSection = () => {
  const { filters } = useFilterContext();
  const { data = {}, isLoading } = useAverageSnapshot(filters.since);

  const download = convertBytesToMegabits(data.download ?? 0);
  const upload = convertBytesToMegabits(data.upload ?? 0);
  const ping = data.ping?.toFixed(2);
  const loss = data.loss?.toFixed(2);

  return (
    <section className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton isLoading={isLoading}>
        <AnalyticsCard icon="/icons/bx-download.svg" title="Download Speed" value={download} unit="Mbps" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <AnalyticsCard icon="/icons/bx-upload.svg" title="Upload Speed" value={upload} unit="Mbps" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <AnalyticsCard icon="/icons/bx-time.svg" title="Latency" value={ping} unit="ms" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <AnalyticsCard icon="/icons/bx-no-signal.svg" title="Packet Loss" value={loss} unit="%" />
      </Skeleton>
    </section>
  );
};
