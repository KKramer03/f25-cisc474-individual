import { Get, Controller, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async find(@Query('user_id') userID: string): Promise<any> {
    return await this.userService.find(userID);
  }
}
