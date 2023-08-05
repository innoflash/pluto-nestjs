import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BaseQueryFilter } from '../../shared/base-query-filter';
import { ProjectStatus } from '../project-status';

@Injectable()
export class ByStatusQueryFilter extends BaseQueryFilter {
  protected filterConditions(
    status: ProjectStatus
  ): FindManyOptions | FindOneOptions {
    return {
      where: { status }
    };
  }
}
