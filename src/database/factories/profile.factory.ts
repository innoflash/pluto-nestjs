import { setSeederFactory } from 'typeorm-extension';
import { Profile } from '../../users/entities/profile.entity';

export default setSeederFactory(Profile, faker => {
  return new Profile({
    phone: faker.phone.number(),
    profession: faker.person.jobTitle(),
    description: faker.lorem.paragraph(2),
    profilePhoto: faker.image.urlLoremFlickr()
  });
});
