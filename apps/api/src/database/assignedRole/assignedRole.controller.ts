import { Get, Controller, Query } from '@nestjs/common';
import { type AssignedRole } from '@repo/database/generated/client';
import { AssignedRoleService } from './assignedRole.service';

@Controller('assignedRole')
export class AssignedRoleController {
  constructor(private assignedRoleService: AssignedRoleService) {}

  @Get()
  async find(
    @Query('assigned_role_id') assignedRoleID: string,
  ): Promise<AssignedRole | null> {
    return await this.assignedRoleService.find(assignedRoleID);
  }

  @Get('all')
  async findAll(): Promise<AssignedRole[] | null> {
    return await this.assignedRoleService.findAll();
  }
}
