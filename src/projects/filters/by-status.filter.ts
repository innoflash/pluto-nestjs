import { BaseFilter } from '../../shared/base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProjectStatus } from '../project-status';

export class ByStatusFilter extends BaseFilter {
  protected filterConditions(
    status: ProjectStatus
  ): FindManyOptions | FindOneOptions {
    return {
      where: { status }
    };
  }
}
