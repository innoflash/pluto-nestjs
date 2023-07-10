import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BoardMessage } from '../../messages/entities/board-message.entity';

export default class BoardMessageSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const teachers = await dataSource.getRepository(User).find({ take: 10 });

    const messagesPromises: Array<Promise<BoardMessage>> = [];

    teachers.forEach(teacher => {
      messagesPromises.push(
        factoryManager.get(BoardMessage).save({ user: teacher })
      );
    });

    return Promise.all(messagesPromises);
  }
}
