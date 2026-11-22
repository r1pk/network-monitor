import { registerAs } from '@nestjs/config';
import { CronExpression } from '@nestjs/schedule';

export default registerAs('speedtest', () => ({
  cron: process.env.SPEEDTEST_CRON_EXPRESSION ?? CronExpression.EVERY_30_MINUTES,
  arguments: process.env.SPEEDTEST_CLI_ARGS,
}));
