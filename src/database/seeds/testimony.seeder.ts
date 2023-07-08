import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Testimony } from '../../testimonies/entities/testimony.entity';

export default class TestimonySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const users = await dataSource.getRepository(User).find({ skip: 10 });

    const testimonyPromises: Array<Promise<Testimony>> = [];

    users.forEach(user => {
      new Array(Math.ceil(Math.random() * 10)).fill(0).forEach(() => {
        testimonyPromises.push(factoryManager.get(Testimony).make({ user }));
      });
    });

    return Promise.all(testimonyPromises).then(testimonies =>
      dataSource.getRepository(Testimony).save(testimonies)
    );
  }
}
