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

  @Get('all')
  async findAll(): Promise<Grade[] | null> {
    return await this.gradeService.findAll();
  }
}
