import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { type Course } from '@repo/database/generated/client';
import { CourseService } from './course.service';
import {
  CourseCreateInput,
  CourseCreateOutput,
  CourseUpdateInput,
} from './course.types';

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
  @Post('create')
  async create(@Body() body: CourseCreateInput): Promise<CourseCreateOutput> {
    return await this.courseService.create(body);
  }

  @Patch('update')
  async update(
    @Query('id') id: string,
    @Body() body: CourseUpdateInput,
  ): Promise<any> {
    return await this.courseService.update(id, body);
  }
}
