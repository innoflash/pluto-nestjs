import { NotImplementedException } from '@nestjs/common';

export class InvalidQueryFilterPolicyException extends NotImplementedException {
  constructor(private readonly className: string) {
    super();
  }

  public message = `${this.className} is not a valid query filter policy. Extend BaseQueryFilterPolicy to make it valid`;
}
