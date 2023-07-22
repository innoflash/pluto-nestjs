import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ProjectQueryFilter extends BaseQueryFilter {
  protected filterConditions(
    projectId: number
  ): FindManyOptions | FindOneOptions {
    return {
      where: {
        projects: {
          id: projectId
        }
      }
    };
  }
}
