import { Injectable } from '@nestjs/common';
// import { type User } from '@repo/database/generated/client';
// import { Prisma } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async find(userID: string): Promise<any | null> {
    const user: any | null = await this.prisma.user.findUnique({
      where: {
        user_id: userID,
      },
    });
    return user;
  }

  async findAll(): Promise<any[]> {
    const users: any[] = await this.prisma.user.findMany();
    return users;
  }
}
