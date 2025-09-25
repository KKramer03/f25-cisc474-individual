import { Injectable } from '@nestjs/common';
import { type Enrollment } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async find(enrollmentID: string): Promise<Enrollment | null> {
    const enrollment: Enrollment | null =
      await this.prisma.enrollment.findUnique({
        where: {
          enrollment_id: enrollmentID,
        },
      });
    return enrollment;
  }

  async findAll(): Promise<Enrollment[] | null> {
    const enrollments: Enrollment[] = await this.prisma.enrollment.findMany();
    return enrollments;
  }
}
