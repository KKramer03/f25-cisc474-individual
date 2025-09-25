import { Get, Controller, Query } from '@nestjs/common';
import { type Enrollment } from '@repo/database/generated/client';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Get()
  async find(
    @Query('enrollment_id') enrollmentID: string,
  ): Promise<Enrollment | null> {
    return await this.enrollmentService.find(enrollmentID);
  }

  @Get('all')
  async findAll(): Promise<Enrollment[] | null> {
    return await this.enrollmentService.findAll();
  }
}
