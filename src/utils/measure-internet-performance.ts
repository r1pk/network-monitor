import { ExecException, exec } from 'child_process';

export interface InternetPerformance {
  download: number;
  upload: number;
  ping: number;
  server: {
    host: string;
  };
  timestamp: string;
}

export const measureInternetPerformance = async (): Promise<InternetPerformance> => {
  return new Promise((resolve, reject) => {
    exec('speedtest-cli --json', (error: ExecException, output: string) => {
      if (error) {
        return reject(error);
      }

      try {
        return resolve(JSON.parse(output));
      } catch (error) {
        return reject(error);
      }
    });
  });
};
