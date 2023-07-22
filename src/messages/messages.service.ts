import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { BaseCrudService } from '../shared/base-crud.service';

@Injectable()
export class MessagesService extends BaseCrudService<Message> {
  public constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<Message> {
    return this.messagesRepository;
  }
}
