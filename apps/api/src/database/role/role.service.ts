import { Injectable } from '@nestjs/common';
import { type Role } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async find(roleID: string): Promise<Role | null> {
    const role: Role | null = await this.prisma.role.findUnique({
      where: {
        role_id: roleID,
      },
    });
    return role;
  }

  async findAll(): Promise<Role[] | null> {
    const roles: Role[] = await this.prisma.role.findMany();
    return roles;
  }
}
