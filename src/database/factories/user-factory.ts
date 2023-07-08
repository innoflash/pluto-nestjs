import { setSeederFactory } from 'typeorm-extension';
import { User } from '@pluto/users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  return new User({
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: 'secret'
  });
});
