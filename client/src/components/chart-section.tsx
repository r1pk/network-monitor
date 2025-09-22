import { DownloadSpeedChart } from '@/components/download-speed-chart';
import { LatencyChart } from '@/components/latency-chart';
import { PacketLossChart } from '@/components/packet-loss-chart';
import { Skeleton } from '@/components/skeleton';
import { UploadSpeedChart } from '@/components/upload-speed-chart';
import { useFilterContext } from '@/contexts/filter-context';
import { useSnapshotList } from '@/hooks/use-snapshot-list';

export const ChartSection = () => {
  const { filters } = useFilterContext();
  const { data = [], isLoading } = useSnapshotList(filters.since);

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="overflow-hidden rounded-lg">
        <Skeleton isLoading={isLoading}>
          <DownloadSpeedChart config={config} snapshots={data} />
        </Skeleton>
      </div>
      <div className="overflow-hidden rounded-lg">
        <Skeleton isLoading={isLoading}>
          <UploadSpeedChart config={config} snapshots={data} />
        </Skeleton>
      </div>
      <div className="overflow-hidden rounded-lg">
        <Skeleton isLoading={isLoading}>
          <LatencyChart config={config} snapshots={data} />
        </Skeleton>
      </div>
      <div className="overflow-hidden rounded-lg">
        <Skeleton isLoading={isLoading}>
          <PacketLossChart config={config} snapshots={data} />
        </Skeleton>
      </div>
    </section>
  );
};
