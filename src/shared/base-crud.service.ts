import { ForbiddenException, Injectable, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import merge from 'lodash.merge';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { BaseQueryFilter } from './base-query-filter';
import { BaseQueryFilterPolicy } from './base-query-filter.policy';
import { BaseRelationPolicy } from './base-relation.policy';
import { FindRequestDto } from './dto/find-request.dto';
import { ListRequestDto } from './dto/list-request.dto';
import { InvalidQueryFilterPolicyException } from './exception-filters/invalid-query-filter-policy.exception';
import { InvalidQueryFilterException } from './exception-filters/invalid-query-filter.exception';
import { InvalidRelationPolicyException } from './exception-filters/invalid-relation-policy.exception';
import { ClassConstructor } from './interceptors/serialize.interceptor';
import { FindByIdQueryFilter } from './query-filters/find-by-id.query.filter';
import { LimitingQueryFilter } from './query-filters/limiting.query.filter';
import { LoadRelationshipsQueryFilter } from './query-filters/load-relationships.query.filter';
import { OrderingQueryFilter } from './query-filters/ordering.query.filter';

@Injectable({
  scope: Scope.REQUEST
})
export abstract class BaseCrudService<T> {
  private queryFilters: Record<string, ClassConstructor> = {};
  private relationsPolicies: Record<string, ClassConstructor | boolean> = {};
  private queryFilterPolicies: Record<string, ClassConstructor | boolean> = {};

  // private readonly repository: Repository<AbstractBaseEntity<T>>;

  public constructor(protected readonly moduleRef: ModuleRef) {}

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
   * `BaseQueryFilter`.
   * @returns The method is returning an instance of the BaseCrudService class.
   */
  public setQueryFilters(
    queryFilters: Record<string, ClassConstructor>
  ): BaseCrudService<T> {
    this.queryFilters = queryFilters;

    return this;
  }

  public setQueryFiltersPolicies(
    queryFiltersPolicies: Record<string, ClassConstructor | boolean>
  ): BaseCrudService<T> {
    this.queryFilterPolicies = queryFiltersPolicies;

    return this;
  }

  public setRelationsPolicies(
    relationsPolicies: Record<string, ClassConstructor | boolean>
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
      this.moduleRef
        .get(OrderingQueryFilter, { strict: false })
        .filter(listRequestDto),
      this.moduleRef
        .get(LimitingQueryFilter, { strict: false })
        .filter(listRequestDto)
    ].forEach(filter => (findManyOptions = merge(findManyOptions, filter)));

    console.log(findManyOptions);

    // Whether to paginate or not.
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
  public findOne<T extends FindRequestDto>(
    id: number | string,
    findRequestDto?: T,
    key = 'id'
  ) {
    let findOneOptions = this.findOptions(
      findRequestDto || {}
    ) as FindOneOptions;

    findOneOptions = merge(
      findOneOptions,
      this.moduleRef
        .get(FindByIdQueryFilter, { strict: false })
        .setKey(key)
        .filter(id)
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

    console.log({ authorizedRelations }, this.relationsPolicies);

    //AUTHORIZE LOADING OF RELATIONS
    Object.entries(this.relationsPolicies)
      .filter(([key]) => {
        return (listRequestDto.include || []).includes(key);
      })
      .forEach(([relation, policy]) => {
        console.log(relation, 'RELATION', typeof policy);
        if (typeof policy === 'boolean' && policy) {
          return authorizedRelations.push(relation);
        } else {
          throw new ForbiddenException(`Forbidden from accessing ${relation}`);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const relationPolicy = this.moduleRef.get(policy, { strict: false });

        if (!(relationPolicy instanceof BaseRelationPolicy)) {
          throw new InvalidRelationPolicyException(
            relationPolicy.constructor.name
          );
        }

        if (
          (relationPolicy as BaseRelationPolicy).authorizeRelation(relation)
        ) {
          console.log('Relation', relation);
          authorizedRelations.push(relation);
        }
      });

    const defaultFilters = [
      this.moduleRef
        .get(LoadRelationshipsQueryFilter, { strict: false })
        .filter(authorizedRelations, true)
    ];

    defaultFilters.forEach(filter => {
      findOptions = merge(findOptions, filter);
    });

    //RUN queryFilters
    Object.entries(this.queryFilters).forEach(([key, filterClass]) => {
      if (
        Object.keys(this.queryFilterPolicies).includes(key) &&
        listRequestDto.filter?.has(key)
      ) {
        if (
          typeof this.queryFilterPolicies[key] === 'boolean' &&
          !this.queryFilterPolicies[key]
        ) {
          throw new ForbiddenException(`You not allowed to query \"${key}\"`);
        }

        const queryFilterPolicy =
          this.moduleRef.get(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this.queryFilterPolicies[key],
            {
              strict: false
            }
          ) ||
          this.moduleRef.create(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            this.queryFilterPolicies[key]
          );

        if (!(queryFilterPolicy instanceof BaseQueryFilterPolicy)) {
          throw new InvalidQueryFilterPolicyException(
            queryFilterPolicy.constructor.name
          );
        }

        (queryFilterPolicy as BaseQueryFilterPolicy).authorizeFilter(
          key,
          listRequestDto.filter.get(key)
        );
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const filterInstance =
        this.moduleRef.get(filterClass, {
          strict: false
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        }) || this.moduleRef.create(filterClass);

      if (!(filterInstance instanceof BaseQueryFilter)) {
        throw new InvalidQueryFilterException(filterInstance.constructor.name);
      }

      if (listRequestDto.filter?.has(key)) {
        findOptions = merge(
          findOptions,
          (filterInstance as BaseQueryFilter).filter(
            listRequestDto.filter.get(key)
          )
        );
      }
    });

    return findOptions;
  }
}
