import { setSeederFactory } from 'typeorm-extension';
import { Message } from '../../messages/entities/message.entity';

export default setSeederFactory(
  Message,
  faker =>
    new Message({
      body: faker.lorem.paragraph(3),
      subject: faker.lorem.sentence()
    })
);
