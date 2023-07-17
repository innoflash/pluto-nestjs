import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageStatusFilter } from './filters/message-status.filter';
import { BaseFilter } from '../shared/base-filter';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessageListingDto } from './responses/message-listing.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { BySenderFilter } from './filters/by-sender.filter';
import { ForRecipientFilter } from './filters/for-recipient.filter';

@Controller('messages')
@ApiTags('Messages')
@UseInterceptors(ClassSerializerInterceptor)
export class MessagesController {
  public constructor(private readonly messagesService: MessagesService) {}

  @ApiOkResponse({ type: MessageListingDto })
  @ApiOperation({
    summary: 'This lists the messages for the given options'
  })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    const filters: Record<string, typeof BaseFilter> = {
      status: MessageStatusFilter,
      sender: BySenderFilter,
      recipient: ForRecipientFilter
    };

    return this.messagesService.setFilters(filters).list(queryParams);
  }

  @ApiOperation({
    summary: 'Fetches a single message'
  })
  @Get(':id')
  public find(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.messagesService.find(id, queryParams);
  }
}
