import { Get, Controller, Query } from '@nestjs/common';
import { type User } from '@repo/database/generated/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async find(@Query('user_id') userID: string): Promise<User | null> {
    return await this.userService.find(userID);
  }

  @Get('all')
  async findAll(): Promise<User[] | null> {
    return await this.userService.findAll();
  }
}
