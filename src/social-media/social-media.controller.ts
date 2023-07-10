import { Controller, Get } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Social Media')
@Controller('social-media')
export class SocialMediaController {
  public constructor(private readonly socialMediaService: SocialMediaService) {}

  @Get()
  public async list() {
    return this.socialMediaService.list();
  }
}
