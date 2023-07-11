import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { AbstractFilter } from '../shared/abstract-filter';

@Injectable()
export class MessagesService {
  private filters: Record<string, typeof AbstractFilter>;

  public constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>
  ) {}

  public setFilters(
    filters: Record<string, typeof AbstractFilter>
  ): MessagesService {
    this.filters = filters;

    return this;
  }

  public list(listMessagesDto: ListMessagesDto) {
    let findManyOptions: FindManyOptions = {};

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

    findManyOptions.order = {
      [listMessagesDto.orderBy || 'id']: listMessagesDto.order || 'asc'
    };

    //RUN filters
    Object.entries(this.filters).forEach(([key, filterClass]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const filterInstance = new filterClass(key);

      if (listMessagesDto.filters?.has(key)) {
        findManyOptions = {
          ...findManyOptions,
          ...filterInstance.filter(listMessagesDto.filters.get(key))
        };
      }
    });
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
