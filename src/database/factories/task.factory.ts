import { setSeederFactory } from 'typeorm-extension';
import { Task } from '../../tasks/entities/task.entity';

export default setSeederFactory(
  Task,
  faker =>
    new Task({
      task: faker.lorem.sentence(),
      startTime: faker.date.anytime(),
      endTime: faker.date.anytime()
    })
);
