import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ContentController],
  providers: [ContentService, PrismaService],
})
export class ContentModule {}
