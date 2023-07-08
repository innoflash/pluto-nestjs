import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
  const salt = bcrypt.genSaltSync();

  return new User({
    email: faker.internet.email({ allowSpecialCharacters: false }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    password: await bcrypt.hash('secret', salt)
  });
});
