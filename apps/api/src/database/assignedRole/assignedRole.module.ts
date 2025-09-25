import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AssignedRoleController } from './assignedRole.controller';
import { AssignedRoleService } from './assignedRole.service';

@Module({
  controllers: [AssignedRoleController],
  providers: [AssignedRoleService, PrismaService],
})
export class AssignedRoleModule {}
