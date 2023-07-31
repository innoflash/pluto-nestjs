import { BaseRelationPolicy } from '../base-relation.policy';

export type RelationPolicyMap = Record<
  string,
  typeof BaseRelationPolicy | boolean
>;
