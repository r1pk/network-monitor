export type Snapshot = {
  id: number;
  download: number | null;
  upload: number | null;
  ping: number | null;
  loss: number | null;
  host: string | null;
  url: string | null;
  timestamp: string;
};
