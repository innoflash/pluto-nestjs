import { Message } from '../entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MessageListingDto {
  @ApiProperty({
    description: 'The list of messages found'
  })
  data: Message[];

  @ApiProperty({
    description: 'The total number of entries for the given query',
    example: 1000
  })
  total: number;
}
