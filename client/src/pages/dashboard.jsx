import { DownloadSpeedChart } from '@/components/charts/download-speed-chart';
import { LatencyChart } from '@/components/charts/latency-chart';
import { PacketLossChart } from '@/components/charts/packet-loss-chart';
import { UploadSpeedChart } from '@/components/charts/upload-speed-chart';
import { Divider } from '@/components/common/divider';
import { Skeleton } from '@/components/common/skeleton';
import { AverageSnapshotPanel } from '@/components/miscellaneous/average-snapshot-panel';
import { SnapshotHistory } from '@/components/miscellaneous/snapshot-history';
import { useAverageSnapshot } from '@/hooks/use-average-snapshot';
import { useSnapshotList } from '@/hooks/use-snapshot-list';

export const Dashboard = () => {
  const { data: snapshot = {}, isLoading: isAverageSnapshotLoading } = useAverageSnapshot();
  const { data: snapshots = [], isLoading: isSnapshotListLoading } = useSnapshotList();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2">
        <span className="mx-auto text-3xl font-bold uppercase">Network Monitor</span>
        <span className="mx-auto font-bold uppercase text-neutral-400">Dashboard</span>
      </div>
      <Divider />
      <Skeleton isLoading={isAverageSnapshotLoading}>
        <AverageSnapshotPanel snapshot={snapshot} />
      </Skeleton>
      <Divider />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <Skeleton isLoading={isSnapshotListLoading}>
            <DownloadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isSnapshotListLoading}>
            <UploadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isSnapshotListLoading}>
            <LatencyChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoading={isSnapshotListLoading}>
            <PacketLossChart snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col">
        <div>
          <Skeleton isLoading={isSnapshotListLoading}>
            <SnapshotHistory snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
