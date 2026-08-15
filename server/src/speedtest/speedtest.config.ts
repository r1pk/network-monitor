import { registerAs } from '@nestjs/config';

export default registerAs('speedtest', () => ({
  args: process.env.SPEEDTEST_CLI_ARGS,
}));
