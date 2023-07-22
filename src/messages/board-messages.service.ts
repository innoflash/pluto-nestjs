import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BaseCrudService } from '../shared/base-crud.service';
import { BoardMessage } from './entities/board-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardMessagesService extends BaseCrudService<BoardMessage> {
  public constructor(
    @InjectRepository(BoardMessage)
    private readonly messageRepository: Repository<BoardMessage>,
    protected readonly moduleRef: ModuleRef
  ) {
    super(moduleRef);
  }

  protected getRepository(): Repository<BoardMessage> {
    return this.messageRepository;
  }
}
