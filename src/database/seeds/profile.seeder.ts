import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Profile } from '../../users/entities/profile.entity';

export default class ProfileSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    return Promise.all(
      await dataSource
        .getRepository(User)
        .find()
        .then(users => {
          return users.map(user => factoryManager.get(Profile).make({ user }));
        })
    ).then(profiles => dataSource.getRepository(Profile).save(profiles));
  }
}
