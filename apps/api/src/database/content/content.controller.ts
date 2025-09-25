import { Get, Controller, Query } from '@nestjs/common';
import { type Content } from '@repo/database/generated/client';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Get()
  async find(@Query('content_id') contentID: string): Promise<Content | null> {
    return await this.contentService.find(contentID);
  }

  @Get('all')
  async findAll(): Promise<Content[] | null> {
    return await this.contentService.findAll();
  }
}
