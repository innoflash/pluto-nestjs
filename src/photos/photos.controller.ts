import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ByUserIdQueryFilter } from '../shared/query-filters/by-user-id.query.filter';

@Controller('photos')
@ApiTags('Photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotosController {
  public constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'Lists the photos' })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.photosService
      .setQueryFilters({
        'by-user': ByUserIdQueryFilter
      })
      .list(queryParams);
  }
}
