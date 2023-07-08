import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Photo } from '../../photos/entities/photo.entity';

export default class PhotoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const users = await dataSource.getRepository(User).find({ take: 10 });

    const photoPromises: Array<Promise<Photo>> = [];

    users.forEach(user => {
      new Array(Math.ceil(Math.random() * 10)).fill(0).forEach(() => {
        photoPromises.push(factoryManager.get(Photo).make({ user }));
      });
    });

    return Promise.all(photoPromises).then(photos =>
      dataSource.getRepository(Photo).save(photos)
    );
  }
}
