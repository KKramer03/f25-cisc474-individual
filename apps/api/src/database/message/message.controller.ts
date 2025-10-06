import { Get, Controller, Query } from '@nestjs/common';
import { type Messages } from '@repo/database/generated/client';
import { MessagesService } from './message.service';

@Controller('message')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Get()
  async find(@Query('message_id') messageID: string): Promise<Messages | null> {
    return await this.messageService.find(messageID);
  }

  @Get('subset')
  async findSubset(
    @Query('amount') amount: string,
  ): Promise<Messages[] | null> {
    return await this.messageService.findSubset(Number(amount));
  }

  @Get('all')
  async findAll(): Promise<Messages[] | null> {
    return await this.messageService.findAll();
  }
}
