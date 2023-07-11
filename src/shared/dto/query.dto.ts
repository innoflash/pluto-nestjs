import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class QueryDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  limit?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  page?: number;

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
    description: 'The filters you want to apply',
    type: 'object',
    example: {
      'filters[message-status]': 'read'
    }
  })
  filters?: Map<string, any>;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({
    description: 'Order in which messages will be rendered'
  })
  order?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The column in which messages should be ordered by'
  })
  orderBy?: string;
}
