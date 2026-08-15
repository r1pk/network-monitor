import { execFile } from 'node:child_process';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { SpeedtestResult } from '../type/speedtest-result.type';

@Injectable()
export class SpeedtestService {
  constructor(private readonly config: ConfigService) {}

  public run(): Promise<SpeedtestResult | null> {
    return new Promise((resolve) => {
      execFile('speedtest', this.getSpeedtestArguments(), (error, stdout) => {
        if (error) {
          return resolve(null);
        }

        return resolve(JSON.parse(stdout) as SpeedtestResult);
      });
    });
  }
  private getSpeedtestArguments(): string[] {
    const customSpeedtestArguments = this.config.get('SPEEDTEST_CLI_ARGS');
    const defaultSpeedtestArguments = ['--format=json'];

    if (!customSpeedtestArguments) {
      return defaultSpeedtestArguments;
    }

    return customSpeedtestArguments.split(/\s+/).concat(defaultSpeedtestArguments);
  }
}
