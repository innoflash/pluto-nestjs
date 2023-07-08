import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await dataSource.getRepository(User).delete({});

    const userFactory = factoryManager.get(User);

    return userFactory.saveMany(100);
  }
}
