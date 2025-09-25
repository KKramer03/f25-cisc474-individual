import { Injectable } from '@nestjs/common';
import { type Content } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async find(contentID: string): Promise<Content | null> {
    const content: Content | null = await this.prisma.content.findUnique({
      where: {
        content_id: contentID,
      },
    });
    return content;
  }

  async findAll(): Promise<Content[] | null> {
    const contents: Content[] = await this.prisma.content.findMany();
    return contents;
  }
}
