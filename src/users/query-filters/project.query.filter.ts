import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Injectable()
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
