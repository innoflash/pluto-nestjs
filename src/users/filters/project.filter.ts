import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class ProjectFilter extends BaseFilter {
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
