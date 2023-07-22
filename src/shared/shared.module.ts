import { Module } from '@nestjs/common';
import { ByUserIdQueryFilter } from './query-filters/by-user-id.query.filter';
import { FindByIdQueryFilter } from './query-filters/find-by-id.query.filter';
import { LimitingQueryFilter } from './query-filters/limiting.query.filter';
import { LoadRelationshipsQueryFilter } from './query-filters/load-relationships.query.filter';
import { OrderingQueryFilter } from './query-filters/ordering.query.filter';

@Module({
  providers: [
    ByUserIdQueryFilter,
    FindByIdQueryFilter,
    LimitingQueryFilter,
    LoadRelationshipsQueryFilter,
    OrderingQueryFilter
  ],
  exports: [
    ByUserIdQueryFilter,
    FindByIdQueryFilter,
    LimitingQueryFilter,
    LoadRelationshipsQueryFilter,
    OrderingQueryFilter
  ]
})
export class SharedModule {}
