import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';

@Injectable()
export class ProjectsService extends BaseCrudService<Project> {
  public constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {
    super();
  }

  protected getRepository(): Repository<Project> {
    return this.projectRepository;
  }
}
