import { Injectable } from '@nestjs/common';
import { TeachersAllowedRelationsPolicy } from '../../shared/policies/relations/teachers-allowed-relations.policy';

@Injectable()
export class RecipientRelationPolicy extends TeachersAllowedRelationsPolicy {}
