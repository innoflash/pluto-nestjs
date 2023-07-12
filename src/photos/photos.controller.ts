import { Controller, Get, Query } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('photos')
export class PhotosController {
  public constructor(private readonly photosService: PhotosService) {}

  @ApiOperation({ summary: 'Lists the photos' })
  @Get()
  public list(@Query() queryParams: ListRequestDto) {
    return this.photosService.list(queryParams);
  }
}
