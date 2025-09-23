import { Get, Injectable, Query } from '@nestjs/common';
import { type User } from '../../../../../packages/database/generated/client';
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
}
