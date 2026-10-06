import type { SnapshotMetricUnit } from '../types/snapshot-metric-unit.type';
import type { SnapshotMetricKey } from '../types/snapshot-metrics.type';

export const SNAPSHOT_METRIC_UNITS: Record<SnapshotMetricKey, SnapshotMetricUnit> = {
  download: 'Mbps',
  upload: 'Mbps',
  ping: 'ms',
  loss: '%',
};
