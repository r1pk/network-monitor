import type { SnapshotMetrics } from './snapshot-metrics.type';

export type Snapshot = SnapshotMetrics & {
  id: number;
  host: string | null;
  url: string | null;
  timestamp: string;
};
