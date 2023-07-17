import merge from 'lodash.merge';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BaseFilter } from './base-filter';
import { BaseRelationPolicy } from './base-relation.policy';
import { FindRequestDto } from './dto/find-request.dto';
import { ListRequestDto } from './dto/list-request.dto';
import { FindByIdQueryFilter } from './query-filters/find-by-id.query.filter';
import { LimitingQueryFilter } from './query-filters/limiting.query.filter';
import { LoadRelationshipsQueryFilter } from './query-filters/load-relationships.query.filter';
import { OrderingQueryFilter } from './query-filters/ordering.query.filter';

export abstract class BaseCrudService<T> {
  private queryFilters: Record<string, typeof BaseFilter> = {};
  private relationsPolicies: Record<string, typeof BaseRelationPolicy> = {};

  /* The `protected abstract getRepository(): Repository<T>` method is a placeholder method that needs
  to be implemented by the child classes that extend the `BaseCrudService` class. It is used to
  retrieve the repository object for the specific entity type `T` from the TypeORM library. The
  `getRepository` method is abstract, meaning it does not have an implementation in the
  `BaseCrudService` class itself, but it must be implemented in the child classes. This allows each
  child class to provide its own implementation of the `getRepository` method based on the specific
  entity type it is working with. */
  protected abstract getRepository(): Repository<T>;

  /**
   * The function `setFilters` sets the query-query-query-query-queryFilters for a CRUD service and returns the service itself.
   * @example {'by-user': ByUserFilter }
   * @param queryFilters - The `query-query-query-query-queryFilters` parameter is an object that maps string keys to the type of
   * `BaseFilter`.
   * @returns The method is returning an instance of the BaseCrudService class.
   */
  public setQueryFilters(
    queryFilters: Record<string, typeof BaseFilter>
  ): BaseCrudService<T> {
    this.queryFilters = queryFilters;

    return this;
  }

  public setRelationsPolicies(
    relationsPolicies: Record<string, typeof BaseRelationPolicy>
  ) {
    this.relationsPolicies = relationsPolicies;

    return this;
  }

  /**
   * The `list` function retrieves a list of data based on the provided request parameters, including
   * filtering, ordering, and pagination options.
   * @param {T} listRequestDto - The `listRequestDto` parameter is a generic type `T` that extends the
   * `ListRequestDto` interface. It represents the request object for listing data. The `ListRequestDto`
   * interface likely contains properties such as `limit` (number of items per page), `page` (current
   * @returns either an array of data or an object with data and meta information. If the limit and page
   * properties are not provided in the listRequestDto, the function returns an array of data. If the
   * limit and page properties are provided, the function returns an object with data and meta
   * information.
   */
  public async list<T extends ListRequestDto>(listRequestDto: T) {
    let findManyOptions = this.findOptions(listRequestDto) as FindManyOptions;

    [
      new OrderingQueryFilter().filter(listRequestDto),
      new LimitingQueryFilter().filter(listRequestDto)
    ].forEach(filter => (findManyOptions = merge(findManyOptions, filter)));

    console.log(findManyOptions);

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

  /**
   * The find function retrieves a single entity from the repository based on the provided id and
   * optional findRequestDto.
   * @param {number | string} id - The `id` parameter is the identifier used to find the entity in the
   * database. It can be either a number or a string.
   * @param {T} [findRequestDto] - `findRequestDto` is an optional parameter of type `T`, which extends
   * `FindRequestDto`. It is used to provide additional filtering options for the find operation. If not
   * provided, an empty object is used as the default value.
   * @param [key=id] - The `key` parameter is a string that represents the property name to use for
   * finding the entity. By default, it is set to `'id'`, which means the entity will be found using the
   * `id` property. However, you can provide a different property name if needed.
   * @returns The method is returning the result of the `findOne` method call on the repository.
   */
  public find<T extends FindRequestDto>(
    id: number | string,
    findRequestDto?: T,
    key = 'id'
  ) {
    let findOneOptions = this.findOptions(
      findRequestDto || {}
    ) as FindOneOptions;

    findOneOptions = merge(
      findOneOptions,
      new FindByIdQueryFilter().setKey(key).filter(id)
    );

    return this.getRepository().findOne(findOneOptions);
  }

  /**
   * The function `findOptions` takes a `listRequestDto` object and returns a `FindManyOptions` or
   * `FindOneOptions` object based on the provided query-query-query-query-queryFilters and include options.
   * @param {FindRequestDto} listRequestDto - The `listRequestDto` parameter is an object of type
   * `FindRequestDto`. It contains information about the request for finding data, such as query-query-query-query-queryFilters,
   * includes, and other options.
   * @returns a variable of type `FindManyOptions<T> | FindOneOptions<T>`.
   */
  protected findOptions(
    listRequestDto: FindRequestDto
  ): FindManyOptions<T> | FindOneOptions<T> {
    let findOptions: FindManyOptions = {
      relationLoadStrategy: 'query'
    };

    const authorizedRelations: Array<string> = (
      listRequestDto.include || []
    ).filter(relation => {
      return !Object.keys(this.relationsPolicies).includes(relation);
    });

    //AUTHORIZE LOADING OF RELATIONS
    Object.entries(this.relationsPolicies)
      .filter(([key]) => {
        return (listRequestDto.include || []).includes(key);
      })
      .forEach(([relation, policy]) => {
        console.log(relation);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const relationPolicy = new policy();

        if (relationPolicy.authorizeRelation(relation)) {
          authorizedRelations.push(relation);
        }
      });

    console.log(authorizedRelations);

    const defaultFilters = [
      new LoadRelationshipsQueryFilter().filter(authorizedRelations, true)
    ];

    defaultFilters.forEach(filter => {
      findOptions = merge(findOptions, filter);
    });

    //RUN query-query-query-query-queryFilters
    Object.entries(this.queryFilters).forEach(([key, filterClass]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const filterInstance = new filterClass(key);

      if (listRequestDto.filter?.has(key)) {
        findOptions = merge(
          findOptions,
          filterInstance.filter(listRequestDto.filter.get(key))
        );
      }
    });

    return findOptions;
  }
}
