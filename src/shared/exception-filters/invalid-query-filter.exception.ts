import { NotImplementedException } from '@nestjs/common';

export class InvalidQueryFilterException extends NotImplementedException {
  constructor(private readonly className: string) {
    super();
  }

  public message = `${this.className} is not a valid query filter. Extend BaseQueryFilter to make it valid`;
}
