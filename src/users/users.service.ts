import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';
import { User } from './entities/user.entity';

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

  public async findByEmail(
    email: string,
    loadRoles = false
  ): Promise<User | undefined> {
    const findOneOptions: Record<string, any> = {
      where: { email }
    };

    if (loadRoles) {
      findOneOptions.relations = {
        roles: true
      };
    }

    return this.usersRepository.findOne(findOneOptions);
  }
}
