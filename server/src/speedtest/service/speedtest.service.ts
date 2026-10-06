import { execFile } from 'node:child_process';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from '../speedtest.config';
import type { SpeedtestResult } from '../type/speedtest-result.type';

@Injectable()
export class SpeedtestService {
  private static readonly EXECUTION_TIMEOUT_MS = 120_000;

  private readonly logger = new Logger(SpeedtestService.name);

  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
  ) {}

  public run(): Promise<SpeedtestResult | null> {
    const args = this.getSpeedtestArguments();
    const opts = { timeout: SpeedtestService.EXECUTION_TIMEOUT_MS, killSignal: 'SIGKILL' as const };

    return new Promise((resolve) => {
      execFile('speedtest', args, opts, (exception, stdout) => {
        try {
          if (exception) {
            throw exception;
          }

          return resolve(JSON.parse(stdout) as SpeedtestResult);
        } catch (error) {
          if (error instanceof Error) {
            this.logger.warn(`Speedtest measurement failed: ${error.message}`);
          }

          return resolve(null);
        }
      });
    });
  }
  private getSpeedtestArguments(): string[] {
    const customSpeedtestArguments = this.config.arguments;
    const defaultSpeedtestArguments = ['--format=json'];

    if (!customSpeedtestArguments) {
      return defaultSpeedtestArguments;
    }

    return customSpeedtestArguments.split(/\s+/).concat(defaultSpeedtestArguments);
  }
}
