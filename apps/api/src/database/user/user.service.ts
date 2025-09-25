import { Injectable } from '@nestjs/common';
import { type User } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async find(userID: string): Promise<User | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        user_id: userID,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }
}
