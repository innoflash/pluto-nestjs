import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseFilter } from '../shared/base-filter';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { BySenderQueryFilter } from './query-filters/by-sender.query.filter';
import { ForRecipientQueryFilter } from './query-filters/for-recipient.query.filter';
import { MessageStatusQueryFilter } from './query-filters/message-status.query.filter';
import { MessagesService } from './messages.service';
import { RecipientRelationPolicy } from './policies/recipient.relation.policy';
import { MessageListingDto } from './responses/message-listing.dto';

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
      status: MessageStatusQueryFilter,
      sender: BySenderQueryFilter,
      recipient: ForRecipientQueryFilter
    };

    return this.messagesService
      .setFilters(filters)
      .setRelationsPolicies({
        'recipient.profile': RecipientRelationPolicy
      })
      .list(queryParams);
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
