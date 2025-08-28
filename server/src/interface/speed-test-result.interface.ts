export interface SpeedTestResult {
  download: {
    bandwidth: number;
  };
  upload: {
    bandwidth: number;
  };
  ping: {
    latency: number;
  };
  packetLoss: number;
  server: {
    host: string;
  };
  result: {
    url: string;
  };
}
