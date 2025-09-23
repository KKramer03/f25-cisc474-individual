import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserService } from './database/user/user.service';
import { UserController } from './database/user/user.controller';

@Module({
  imports: [LinksModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
