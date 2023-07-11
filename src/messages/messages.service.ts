import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListMessagesDto } from './dtos/list-messages.dto';

@Injectable()
export class MessagesService {
  public constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>
  ) {}

  public list(listMessagesDto: ListMessagesDto) {
    const findManyOptions: FindManyOptions = {};

    if (listMessagesDto.limit) {
      findManyOptions.skip =
        ((listMessagesDto.page || 1) - 1) * listMessagesDto.limit;
      findManyOptions.take = listMessagesDto.limit;
    }

    if (listMessagesDto.include) {
      findManyOptions.relations = this.resolveRelations(
        listMessagesDto.include
      );
    } else {
      findManyOptions.loadRelationIds = true;
    }

    return this.messagesRepository.find(findManyOptions);
  }

  private resolveRelations(relations: string[]) {
    const queryRelations = relations
      .map(relation => {
        return {
          [relation]: true
        };
      })
      .reduce((prev, cur) => {
        return { ...prev, ...cur };
      }, {});

    return queryRelations;
  }
}
