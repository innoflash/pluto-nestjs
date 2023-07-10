import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

export default class MessageSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const teachers = await dataSource.getRepository(User).find({ take: 10 });

    const messagesPromises: Array<Promise<Message>> = [];

    for (const teacher of teachers) {
      const students = await dataSource
        .getRepository(User)
        .createQueryBuilder('student')
        .select()
        .offset(10)
        .orderBy('RANDOM()')
        .take(Math.ceil(Math.random() * 6))
        .getMany();

      students.forEach(student => {
        messagesPromises.push(
          factoryManager.get(Message).save({
            sender: teacher,
            recipient: student
          })
        );
      });
    }

    return Promise.all(messagesPromises);
  }
}
