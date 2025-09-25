import { Injectable } from '@nestjs/common';
import { type AssignedRole } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignedRoleService {
  constructor(private prisma: PrismaService) {}

  async find(assignedRoleID: string): Promise<AssignedRole | null> {
    const assignedRole: AssignedRole | null =
      await this.prisma.assignedRole.findUnique({
        where: {
          assigned_role_id: assignedRoleID,
        },
      });
    return assignedRole;
  }

  async findAll(): Promise<AssignedRole[] | null> {
    const assignedRoles: AssignedRole[] =
      await this.prisma.assignedRole.findMany();
    return assignedRoles;
  }
}
