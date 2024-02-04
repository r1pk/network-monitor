import { ExecException, exec } from 'child_process';

export interface InternetSpeedMeasurementResult {
  download: number;
  upload: number;
  latency: number;
  jitter: number;
  loss: string;
  host: string;
  url: string;
}

export const measureInternetSpeed = async (): Promise<InternetSpeedMeasurementResult> => {
  return new Promise((resolve, reject) => {
    exec('speedtest --format=json', (error: ExecException, stdout: string) => {
      if (error) {
        return reject(error);
      }

      try {
        const output = JSON.parse(stdout);
        const result: InternetSpeedMeasurementResult = {
          download: output.download.bandwidth,
          upload: output.upload.bandwidth,
          latency: output.ping.latency,
          jitter: output.ping.jitter,
          loss: output.packetLoss,
          host: output.server.host,
          url: output.result.url,
        };

        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  });
};
