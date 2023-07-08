import { setSeederFactory } from 'typeorm-extension';
import { Project } from '../../projects/entities/project.entity';

export default setSeederFactory(Project, faker => new Project({}));
