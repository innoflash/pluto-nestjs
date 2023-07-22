import { Module } from '@nestjs/common';
import { ByUserIdQueryFilter } from './query-filters/by-user-id.query.filter';
import { FindByIdQueryFilter } from './query-filters/find-by-id.query.filter';

@Module({
  providers: [ByUserIdQueryFilter, FindByIdQueryFilter],
  exports: [ByUserIdQueryFilter, FindByIdQueryFilter]
})
export class SharedModule {}
