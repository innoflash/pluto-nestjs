import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { FindRequestDto } from '../shared/dto/find-request.dto';
import { ListRequestDto } from '../shared/dto/list-request.dto';
import { ByUserIdQueryFilter } from '../shared/query-filters/by-user-id.query.filter';
import { TestimoniesService } from './testimonies.service';

@Controller('testimonies')
@ApiTags('Testimonies')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TestimoniesController {
  public constructor(private readonly testimoniesService: TestimoniesService) {}

  @Get('')
  public list(@Query() listRequestDto: ListRequestDto) {
    return this.testimoniesService
      .setQueryFilters({
        user: ByUserIdQueryFilter
      })
      .list(listRequestDto);
  }

  @Get(':id')
  public findTestimony(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryParams: FindRequestDto
  ) {
    return this.testimoniesService.findOne(id, queryParams);
  }
}
