import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { MessageStatusFilter } from './filters/message-status.filter';
import { AbstractFilter } from '../shared/abstract-filter';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @Get()
  public list(@Query() queryParams: ListMessagesDto) {
    console.log(queryParams.filters?.entries());

    const filters: Record<string, typeof AbstractFilter> = {
      'message-status': MessageStatusFilter
    };

    return this.messagesService.setFilters(filters).list(queryParams);
  }
}
