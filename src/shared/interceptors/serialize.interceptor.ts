import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  public constructor(private readonly dto: any) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(res =>
        plainToClass(this.dto, res, {
          excludeExtraneousValues: true
        })
      )
    );
  }
}
