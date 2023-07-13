import { BaseFilter } from './base-filter';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { ListRequestDto } from './dto/list-request.dto';
import { LoadRelationshipsFilter } from './filters/load-relationships.filter';
import { OrderingFilter } from './filters/ordering.filter';
import { LimitingFilter } from './filters/limiting.filter';
import { FindRequestDto } from './dto/find-request.dto';
import { FindByIdFilter } from './filters/find-by-id.filter';

export abstract class BaseCrudService<T> {
  private filters: Record<string, typeof BaseFilter> = {};

  protected abstract getRepository(): Repository<T>;

  public setFilters(
    filters: Record<string, typeof BaseFilter>
  ): BaseCrudService<T> {
    this.filters = filters;

    return this;
  }

  public async list<T extends ListRequestDto>(listRequestDto: T) {
    let findManyOptions = this.findOptions(listRequestDto) as FindManyOptions;

    [
      new OrderingFilter().filter(listRequestDto),
      new LimitingFilter().filter(listRequestDto)
    ].forEach(filter => {
      findManyOptions = {
        ...findManyOptions,
        ...filter
      };
    });

    // Whether or not to paginate or not.
    if (!listRequestDto.limit && !listRequestDto.page) {
      if ('skip' in findManyOptions) delete findManyOptions.skip;
      if ('take' in findManyOptions) delete findManyOptions.take;

      return this.getRepository().find(findManyOptions);
    }

    const [data, total] = await this.getRepository().findAndCount(
      findManyOptions
    );

    return {
      data,
      meta: {
        total,
        count: data.length,
        perPage: listRequestDto.limit || findManyOptions.take,
        currentPage:
          listRequestDto.page ||
          findManyOptions.skip / findManyOptions.take - 1,
        from: findManyOptions.skip,
        to: findManyOptions.skip + findManyOptions.take,
        lastPage: Math.ceil(total / findManyOptions.take)
      }
    };
  }

  public find<T extends FindRequestDto>(
    id: number | string,
    findRequestDto?: T,
    key = 'id'
  ) {
    let findOneOptions = this.findOptions(
      findRequestDto || {}
    ) as FindOneOptions;

    findOneOptions = {
      ...findOneOptions,
      ...new FindByIdFilter().filter(id, key)
    };

    return this.getRepository().findOne(findOneOptions);
  }

  protected findOptions(
    listRequestDto: FindRequestDto
  ): FindManyOptions<T> | FindOneOptions<T> {
    let findOptions: FindManyOptions = {
      relationLoadStrategy: 'query'
    };

    const defaultFilters = [
      new LoadRelationshipsFilter().filter(listRequestDto.include)
    ];

    defaultFilters.forEach(filter => {
      findOptions = {
        ...findOptions,
        ...filter
      };
    });

    //RUN filters
    Object.entries(this.filters).forEach(([key, filterClass]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const filterInstance = new filterClass(key);

      if (listRequestDto.filters?.has(key)) {
        findOptions = {
          ...findOptions,
          ...filterInstance.filter(listRequestDto.filters.get(key))
        };
      }
    });

    return findOptions;
  }
}
