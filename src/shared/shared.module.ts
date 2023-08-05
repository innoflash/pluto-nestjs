import { Module } from '@nestjs/common';
import { EntityPolicy } from './policies/entity.policy';
import { ForCurrentUserFilterPolicy } from './policies/queries/for-current-user.filter.policy';
import { TeachersAllowedRelationsPolicy } from './policies/relations/teachers-allowed-relations.policy';
import { ByUserIdQueryFilter } from './query-filters/by-user-id.query.filter';
import { FindByIdQueryFilter } from './query-filters/find-by-id.query.filter';
import { LimitingQueryFilter } from './query-filters/limiting.query.filter';
import { LoadRelationshipsQueryFilter } from './query-filters/load-relationships.query.filter';
import { OrderingQueryFilter } from './query-filters/ordering.query.filter';
import { UserRelationPolicy } from './relation-policies/user-relation.policy';
import { RequestService } from './request.service';

@Module({
  providers: [
    ByUserIdQueryFilter,
    FindByIdQueryFilter,
    LimitingQueryFilter,
    LoadRelationshipsQueryFilter,
    OrderingQueryFilter,
    UserRelationPolicy,
    RequestService,
    ForCurrentUserFilterPolicy,
    TeachersAllowedRelationsPolicy,
    EntityPolicy
  ],
  exports: [
    ByUserIdQueryFilter,
    FindByIdQueryFilter,
    LimitingQueryFilter,
    LoadRelationshipsQueryFilter,
    OrderingQueryFilter,
    UserRelationPolicy,
    RequestService,
    ForCurrentUserFilterPolicy,
    TeachersAllowedRelationsPolicy,
    EntityPolicy
  ]
})
export class SharedModule {}
