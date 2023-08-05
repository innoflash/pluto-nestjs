import { NotImplementedException } from '@nestjs/common';

export class InvalidRelationPolicyException extends NotImplementedException {
  constructor(private readonly className: string) {
    super();
  }

  public message = `${this.className} is not a valid relation policy. Extend BaseRelationPolicy to make it valid`;
}
