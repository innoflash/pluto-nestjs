import { AbstractFilter } from './abstract-filter';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ListRequestDto } from './dto/list-request.dto';
import { LoadRelationshipsFilter } from './filters/load-relationships.filter';
import { OrderingFilter } from './filters/ordering.filter';
import { LimitingFilter } from './filters/limiting.filter';

export abstract class AbstractCrudService<T> {
  private filters: Record<string, typeof AbstractFilter>;

  protected abstract getRepository(): Repository<T>;

  public setFilters(
    filters: Record<string, typeof AbstractFilter>
  ): AbstractCrudService<T> {
    this.filters = filters;

    return this;
  }

  public async list<T extends ListRequestDto>(queryDto: T) {
    const findOptions = this.findOptions(queryDto);

    // Whether or not to paginate or not.
    if (!queryDto.limit && !queryDto.page) {
      if ('skip' in findOptions) delete findOptions.skip;
      if ('take' in findOptions) delete findOptions.take;

      return this.getRepository().find(findOptions);
    }

    const [data, total] = await this.getRepository().findAndCount(findOptions);

    return { data, total };
  }

  protected findOptions(
    listRequestDto: ListRequestDto
  ): FindManyOptions<T> | FindOneOptions<T> {
    let findManyOptions: FindManyOptions = {
      relationLoadStrategy: 'query'
    };

    const defaultFilters = [
      new LoadRelationshipsFilter().filter(listRequestDto.include),
      new OrderingFilter().filter(listRequestDto),
      new LimitingFilter().filter(listRequestDto)
    ];

    defaultFilters.forEach(filter => {
      findManyOptions = {
        ...findManyOptions,
        ...filter
      };
    });

    //RUN filters
    Object.entries(this.filters).forEach(([key, filterClass]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const filterInstance = new filterClass(key);

      if (listRequestDto.filters?.has(key)) {
        findManyOptions = {
          ...findManyOptions,
          ...filterInstance.filter(listRequestDto.filters.get(key))
        };
      }
    });

    return findManyOptions;
  }
}
