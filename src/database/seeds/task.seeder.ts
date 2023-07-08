import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';

export default class TaskSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const users = await dataSource.getRepository(User).find({ skip: 10 });

    const tasksPromises: Array<Promise<Task>> = [];

    users.forEach(user => {
      new Array(Math.ceil(Math.random() * 3)).fill(0).forEach(() => {
        tasksPromises.push(factoryManager.get(Task).make({ user }));
      });
    });

    return Promise.all(tasksPromises).then(tasks =>
      dataSource.getRepository(Task).save(tasks)
    );
  }
}
