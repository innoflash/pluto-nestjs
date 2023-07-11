import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ListMessagesDto } from './dtos/list-messages.dto';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public list(@Query() queryParams: ListMessagesDto) {
    console.log(queryParams);

    return this.messagesService.list(queryParams);
  }
}
