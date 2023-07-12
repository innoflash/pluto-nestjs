import { Controller, Get } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Social Media')
@Controller('social-media')
export class SocialMediaController {
  public constructor(private readonly socialMediaService: SocialMediaService) {}

  @ApiOperation({ summary: 'A list of social media stats' })
  @Get()
  public async list() {
    return this.socialMediaService.list();
  }
}
