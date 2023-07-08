import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export default class ProjectSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    return factoryManager.get(Project).saveMany(20);
  }
}
