import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@pluto/users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const userFactory = factoryManager.get(User);

    return userFactory.saveMany(10);
  }
}
