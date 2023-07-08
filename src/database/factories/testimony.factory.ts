import { setSeederFactory } from 'typeorm-extension';
import { Testimony } from '../../testimonies/entities/testimony.entity';

export default setSeederFactory(
  Testimony,
  faker =>
    new Testimony({
      testimony: faker.lorem.sentences(2)
    })
);
