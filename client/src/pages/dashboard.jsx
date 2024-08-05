import { useSnapshots } from '../hooks/use-snapshots';

import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

import { DownloadSpeedChart } from '../components/download-speed-chart';
import { UploadSpeedChart } from '../components/upload-speed-chart';
import { LatencyChart } from '../components/latency-chart';
import { PacketLossChart } from '../components/packet-loss-chart';
import { SnapshotHistory } from '../components/snapshot-history';

export const Dashboard = () => {
  const { data: snapshots = [], isLoading } = useSnapshots();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold uppercase mx-auto">Network Monitor</span>
        <span className="text-white/60 font-bold uppercase mx-auto">Dashboard</span>
      </div>
      <Divider className="my-4" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <DownloadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <UploadSpeedChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <LatencyChart snapshots={snapshots} />
          </Skeleton>
        </div>
        <div>
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <PacketLossChart snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex flex-col">
        <div>
          <Skeleton isLoaded={!isLoading} className="rounded-lg">
            <SnapshotHistory snapshots={snapshots} />
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
