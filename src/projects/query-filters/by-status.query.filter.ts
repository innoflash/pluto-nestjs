import { Injectable } from '@nestjs/common';
import { BaseQueryFilter } from '../../shared/base-query-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';
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
