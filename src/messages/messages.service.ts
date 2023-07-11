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
      findManyOptions.relationLoadStrategy = 'query';
    } else {
      findManyOptions.loadRelationIds = true;
    }

    if (listMessagesDto.order) {
      findManyOptions.order = {
        id: listMessagesDto.order.toUpperCase()
      };
    }

    return this.messagesRepository.find(findManyOptions);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private resolveRelations(relations: string[]) {
    return relations
      .map(relation => {
        let currentRelation = relation;
        let nestedRelations: Array<string> = [];
        if (relation.includes('.')) {
          currentRelation = relation.substring(0, relation.indexOf('.'));
          nestedRelations = relation
            .substring(relation.indexOf('.') + 1)
            .split('.');
        }

        return {
          [currentRelation]: !nestedRelations.length
            ? true
            : this.resolveRelations(nestedRelations)
        };
      })
      .reduce((prev, cur) => {
        return { ...prev, ...cur };
      }, {});
  }
}
