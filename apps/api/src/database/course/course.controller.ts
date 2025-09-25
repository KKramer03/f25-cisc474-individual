import { Controller, Get, Query } from '@nestjs/common';
import { type Course } from '@repo/database/generated/client';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async find(@Query('course_id') courseID: string): Promise<Course | null> {
    return await this.courseService.find(courseID);
  }

  @Get('all')
  async findAll(): Promise<Course[] | null> {
    return await this.courseService.findAll();
  }
}
