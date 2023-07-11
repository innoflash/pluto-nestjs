import { IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListMessagesDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  limit?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional()
  page?: number;
}
