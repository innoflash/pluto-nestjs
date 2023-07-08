import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceOptions } from './data-source';
import { User } from '../users/entities/user.entity';

(async () => {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: [User]
  });
  await dataSource.initialize();

  await runSeeders(dataSource);
})();