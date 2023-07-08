import { setSeederFactory } from 'typeorm-extension';
import { Project } from '../../projects/entities/project.entity';
import { ProjectStatus } from '../../projects/project-status';

export default setSeederFactory(
  Project,
  faker =>
    new Project({
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.enumValue(ProjectStatus),
      progress: faker.number.int({ min: 0, max: 100 })
    })
);
