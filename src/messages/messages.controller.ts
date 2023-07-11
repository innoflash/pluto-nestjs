import { Controller, Get, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { MessageStatusFilter } from './filters/message-status.filter';
import { AbstractFilter } from '../shared/abstract-filter';
import { ApiOkResponse } from '@nestjs/swagger';
import { MessageListingDto } from './responses/message-listing.dto';

@Controller('messages')
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @ApiOkResponse({ type: MessageListingDto })
  @Get()
  public list(@Query() queryParams: ListMessagesDto) {
    const filters: Record<string, typeof AbstractFilter> = {
      'message-status': MessageStatusFilter
    };

    return this.messagesService.setFilters(filters).list(queryParams);
  }
}
