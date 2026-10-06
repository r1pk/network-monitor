import { DataSource } from 'typeorm';

import { options } from './database.options';

export default new DataSource(options);
