import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService extends BaseCrudService<Task> {
  public constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<Task> {
    return this.repository;
  }
}
