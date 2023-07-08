import { setSeederFactory } from 'typeorm-extension';
import { Role } from '../../users/entities/role.entity';

export default setSeederFactory(Role, (faker) => {
  return new Role({
    description: faker.lorem.sentence()
  });
});
