import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseCrudService } from '../shared/base-crud.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseCrudService<User> {
  public constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<User> {
    return this.usersRepository;
  }
}
