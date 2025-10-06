import { Get, Controller, Query } from '@nestjs/common';
import { type Grade } from '@repo/database/generated/client';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
  constructor(private gradeService: GradeService) {}

  @Get()
  async find(@Query('grade_id') gradeID: string): Promise<Grade | null> {
    return await this.gradeService.find(gradeID);
  }

  @Get('user-course')
  async findUserCourseGrades(
    @Query('user_id') userID: string,
    @Query('course_id') courseID: string,
  ): Promise<Grade[]> {
    return await this.gradeService.findUserCourseGrades(userID, courseID);
  }

  @Get()
  async findEnrolledGrades(
    @Query('enrollment_id') enrollmentID: string,
  ): Promise<Grade[] | null> {
    return await this.gradeService.findEnrolledGrades(enrollmentID);
  }

  @Get('all')
  async findAll(): Promise<Grade[] | null> {
    return await this.gradeService.findAll();
  }
}
