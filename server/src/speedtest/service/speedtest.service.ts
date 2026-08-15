import { execFile } from 'node:child_process';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import speedtestConfig from '../speedtest.config';
import type { SpeedtestResult } from '../type/speedtest-result.type';

@Injectable()
export class SpeedtestService {
  constructor(
    @Inject(speedtestConfig.KEY)
    private readonly config: ConfigType<typeof speedtestConfig>,
  ) {}

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
    const customSpeedtestArguments = this.config.args;
    const defaultSpeedtestArguments = ['--format=json'];

    if (!customSpeedtestArguments) {
      return defaultSpeedtestArguments;
    }

    return customSpeedtestArguments.split(/\s+/).concat(defaultSpeedtestArguments);
  }
}
