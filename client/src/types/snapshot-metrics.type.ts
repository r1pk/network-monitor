export type SnapshotMetrics = {
  download: number | null;
  upload: number | null;
  ping: number | null;
  loss: number | null;
};

export type SnapshotMetricKey = keyof SnapshotMetrics;
