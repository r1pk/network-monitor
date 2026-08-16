import { execFile } from 'node:child_process';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import configuration from '../speedtest.config';
import type { SpeedtestResult } from '../type/speedtest-result.type';

@Injectable()
export class SpeedtestService {
  constructor(
    @Inject(configuration.KEY)
    private readonly config: ConfigType<typeof configuration>,
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
    const customSpeedtestArguments = this.config.arguments;
    const defaultSpeedtestArguments = ['--format=json'];

    if (!customSpeedtestArguments) {
      return defaultSpeedtestArguments;
    }

    return customSpeedtestArguments.split(/\s+/).concat(defaultSpeedtestArguments);
  }
}
