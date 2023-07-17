import { IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindRequestDto {
  @IsOptional()
  @Type(() => String)
  @Transform(value => value.value.toString().split(','))
  @ApiPropertyOptional({
    description: 'The relationships that you want loaded'
  })
  include?: string[];

  @IsOptional()
  @Type(() => String)
  //@Transform(value => value.value.toString().split(','))
  @ApiPropertyOptional({
    description: 'The query-query-query-query-filters you want to apply',
    type: 'object',
    example: {
      'filters[message-status]': 'read'
    }
  })
  filter?: Map<string, any>;
}
