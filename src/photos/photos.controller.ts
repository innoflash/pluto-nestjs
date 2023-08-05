import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByUserIdQueryFilter } from '../shared/query-filters/by-user-id.query.filter';
import { PhotosService } from './photos.service';

@Controller('photos')
@ApiTags('Photos')
@UseGuards(JwtAuthGuard)
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
