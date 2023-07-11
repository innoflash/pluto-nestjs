import { Message } from '../entities/message.entity';

export class MessageListingDto {
  data: Message[];
  total: number;
}
