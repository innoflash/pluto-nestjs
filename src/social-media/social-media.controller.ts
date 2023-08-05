import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { SocialMediaService } from './social-media.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Social Media')
@Controller('social-media')
@UseGuards(JwtAuthGuard)
export class SocialMediaController {
  public constructor(private readonly socialMediaService: SocialMediaService) {}

  @ApiOperation({ summary: 'A list of social media stats' })
  @Get()
  public async list() {
    return this.socialMediaService.list();
  }
}
