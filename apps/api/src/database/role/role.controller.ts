import { Get, Controller, Query } from '@nestjs/common';
import { type Role } from '@repo/database/generated/client';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async find(@Query('role_id') roleID: string): Promise<Role | null> {
    return await this.roleService.find(roleID);
  }

  @Get('all')
  async findAll(): Promise<Role[] | null> {
    return await this.roleService.findAll();
  }
}
