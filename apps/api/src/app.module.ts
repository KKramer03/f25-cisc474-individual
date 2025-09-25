import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './database/user/user.module';
import { CourseModule } from './database/course/course.module';
import { ContentModule } from './database/content/content.module';
import { RoleModule } from './database/role/role.module';
import { AssignedRoleModule } from './database/assignedRole/assignedRole.module';
import { EnrollmentModule } from './database/enrollment/enrollment.module';

@Module({
  imports: [
    LinksModule,
    UserModule,
    CourseModule,
    ContentModule,
    RoleModule,
    AssignedRoleModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
