import { Injectable } from '@nestjs/common';
import { type User } from '@repo/database/generated/client';
import { prisma } from '../../../../../packages/database/src/client';

@Injectable()
export class UserService {
  async find(userID: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
      where: {
        user_id: userID,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await prisma.user.findMany();
    return users;
  }
}
