import { registerAs } from '@nestjs/config';

import { options } from './database.options';

export default registerAs('database', () => options);
