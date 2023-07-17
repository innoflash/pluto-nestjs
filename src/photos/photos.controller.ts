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
import { ByUserIdFilter } from '../shared/filters/by-user-id.filter';

@Controller('photos')
@ApiTags('Photos')
@UseInterceptors(ClassSerializerInterceptor)
export class PhotosController {
  public constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'Lists the photos' })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.photosService
      .setFilters({
        'by-user': ByUserIdFilter
      })
      .list(queryParams);
  }
}
