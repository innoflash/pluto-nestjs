import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { AbstractFilter } from '../shared/abstract-filter';
import { LoadRelationshipsFilter } from '../shared/filters/load-relationships.filter';

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
    let findManyOptions: FindManyOptions = {
      relationLoadStrategy: 'query'
    };

    if (listMessagesDto.limit) {
      findManyOptions.skip =
        ((listMessagesDto.page || 1) - 1) * listMessagesDto.limit;
      findManyOptions.take = listMessagesDto.limit;
    }

    //Apply relationships filter.
    const relationshipsFilter = new LoadRelationshipsFilter();
    findManyOptions = {
      ...findManyOptions,
      ...relationshipsFilter.filter(listMessagesDto.include)
    };

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
}
