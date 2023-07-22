import { Module } from '@nestjs/common';
import { ByUserIdQueryFilter } from './query-filters/by-user-id.query.filter';

@Module({
  providers: [ByUserIdQueryFilter],
  exports: [ByUserIdQueryFilter]
})
export class SharedModule {}
