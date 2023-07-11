import { IsIn, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ListMessagesDto {
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
  @IsIn(['asc', 'desc'])
  @ApiPropertyOptional({
    description: 'Order in which messages will be rendered'
  })
  order?: string;
}
