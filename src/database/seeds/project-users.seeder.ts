import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

export default class ProjectUsersSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const projectsPromises = await dataSource
      .getRepository(User)
      .find({ skip: 10 })
      .then(students =>
        students.map(async student => {
          const projects = await dataSource
            .getRepository(Project)
            .createQueryBuilder('project')
            .select()
            .orderBy('RANDOM()')
            .take(Math.ceil(Math.random() * 4))
            .getMany();

          student.projects = projects;

          return dataSource.getRepository(User).save(student);
        })
      );

    return Promise.all(projectsPromises);
  }
}
