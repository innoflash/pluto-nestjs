import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserRole } from '../../users/user-role';
import { Role } from '../../users/entities/role.entity';

export default class RoleSeeder implements Seeder {
  public run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    console.log('Saving roles');

    return Promise.all(
      Object.values(UserRole).map((role) =>
        factoryManager.get(Role).make({
          name: role
        })
      )
    ).then((res) => dataSource.getRepository(Role).save(res));
  }
}
