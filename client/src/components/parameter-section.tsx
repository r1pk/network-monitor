import { ParameterCard } from '@/components/parameter-card';
import { Skeleton } from '@/components/skeleton';
import { useFilterContext } from '@/contexts/filter-context';
import { useAverageSnapshot } from '@/hooks/use-average-snapshot';
import { convertBytesToMegabits } from '@/utilities/convert-bytes-to-megabits';

export const ParameterSection = () => {
  const { filters } = useFilterContext();
  const { data = null, isLoading } = useAverageSnapshot(filters.since);

  const { download = 0, upload = 0, ping = 0, loss = 0 } = data ?? {};
  const parameters = {
    download: convertBytesToMegabits(download),
    upload: convertBytesToMegabits(upload),
    ping: ping.toFixed(2),
    loss: loss.toFixed(2),
  };

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Skeleton isLoading={isLoading}>
        <ParameterCard icon="/icons/bx-download.svg" title="Download Speed" value={parameters.download} unit="Mbps" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <ParameterCard icon="/icons/bx-upload.svg" title="Upload Speed" value={parameters.upload} unit="Mbps" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <ParameterCard icon="/icons/bx-time.svg" title="Latency" value={parameters.ping} unit="ms" />
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <ParameterCard icon="/icons/bx-no-signal.svg" title="Packet Loss" value={parameters.loss} unit="%" />
      </Skeleton>
    </section>
  );
};
