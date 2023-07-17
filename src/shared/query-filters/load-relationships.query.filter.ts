import { BaseFilter } from '../base-filter';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export class LoadRelationshipsQueryFilter extends BaseFilter {
  public filterConditions(
    value?: Array<string>
  ): FindManyOptions | FindOneOptions {
    if (value) {
      return {
        relations: this.resolveRelations(value)
      };
    }
    return {
      //loadRelationIds: true
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private resolveRelations(relations: string[]) {
    return relations
      .map(relation => {
        let currentRelation = relation;
        let nestedRelations: Array<string> = [];
        if (relation.includes('.')) {
          currentRelation = relation.substring(0, relation.indexOf('.'));
          nestedRelations = relation
            .substring(relation.indexOf('.') + 1)
            .split('.');
        }

        return {
          [currentRelation]: !nestedRelations.length
            ? true
            : this.resolveRelations(nestedRelations)
        };
      })
      .reduce((prev, cur) => {
        return { ...prev, ...cur };
      }, {});
  }
}
