import { registerAs } from '@nestjs/config';

export default registerAs('speedtest', () => ({
  arguments: process.env.SPEEDTEST_CLI_ARGS,
}));
