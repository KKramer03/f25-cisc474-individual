import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService],
})
export class MessagesModule {}
