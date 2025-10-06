import { Injectable } from '@nestjs/common';
import { type Messages } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async find(messageID: string): Promise<Messages | null> {
    const message: Messages | null = await this.prisma.messages.findUnique({
      where: {
        message_id: messageID,
      },
    });
    return message;
  }

  async findSubset(amount: number): Promise<Messages[] | null> {
    const messages: Messages[] = await this.prisma.messages.findMany({
      take: amount,
    });
    return messages;
  }

  async findAll(): Promise<Messages[] | null> {
    const messages: Messages[] = await this.prisma.messages.findMany();
    return messages;
  }
}
