import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '../shared/base-crud.service';
import { BoardMessage } from './entities/board-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardMessagesService extends BaseCrudService<BoardMessage> {
  public constructor(
    @InjectRepository(BoardMessage)
    private readonly messageRepository: Repository<BoardMessage>
  ) {
    super();
  }

  protected getRepository(): Repository<BoardMessage> {
    return this.messageRepository;
  }
}
