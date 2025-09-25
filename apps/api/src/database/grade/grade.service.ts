import { Injectable } from '@nestjs/common';
import { type Grade } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GradeService {
  constructor(private prisma: PrismaService) {}

  async find(gradeID: string): Promise<Grade | null> {
    const grade: Grade | null = await this.prisma.grade.findUnique({
      where: {
        grade_id: gradeID,
      },
    });
    return grade;
  }

  async findAll(): Promise<Grade[] | null> {
    const grades: Grade[] | null = await this.prisma.grade.findMany();
    return grades;
  }
}
