import { setSeederFactory } from 'typeorm-extension';
import { SocialMedia } from '../../social-media/social-media.entity';

export default setSeederFactory(
  SocialMedia,
  faker =>
    new SocialMedia({
      unitLeft: faker.number.int({ max: 1000000 }),
      unitRight: faker.number.int({ max: 1000000 })
    })
);
