import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { PrismaService } from 'src/prisma.service';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [PrismaService, CourseService],
})
export class CourseModule {}
