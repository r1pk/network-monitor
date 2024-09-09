import { AverageSnapshot } from '@/components/average-snapshot';
import { Divider } from '@/components/divider';
import { DownloadSpeedChart } from '@/components/download-speed-chart';
import { LatencyChart } from '@/components/latency-chart';
import { PacketLossChart } from '@/components/packet-loss-chart';
import { Skeleton } from '@/components/skeleton';
import { SnapshotHistory } from '@/components/snapshot-history';
import { UploadSpeedChart } from '@/components/upload-speed-chart';
import { useSnapshots } from '@/hooks/use-snapshots';

export const Dashboard = () => {
  const { data: snapshots = [], isLoading } = useSnapshots();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2">
        <span className="mx-auto text-3xl font-bold uppercase">Network Monitor</span>
        <span className="mx-auto font-bold uppercase text-neutral-400">Dashboard</span>
      </div>
      <Divider />
      <AverageSnapshot />
      <Divider />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Skeleton isLoading={isLoading}>
            <DownloadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isLoading}>
            <UploadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isLoading}>
            <LatencyChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isLoading}>
            <PacketLossChart snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <div>
          <Skeleton isLoading={isLoading}>
            <SnapshotHistory snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
