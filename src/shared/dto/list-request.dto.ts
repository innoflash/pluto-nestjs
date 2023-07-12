import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FindRequestDto } from './find-request.dto';

export class ListRequestDto extends FindRequestDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  limit?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  page?: number;

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
