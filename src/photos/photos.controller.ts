import { Controller, Get, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ByUserIdFilter } from '../shared/filters/by-user-id.filter';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {
  public constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'Lists the photos' })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.photosService
      .setFilters({
        'by-user': ByUserIdFilter
      })
      .authorizeFilters({
        'by-user': true
      })
      .list(queryParams);
  }
}
