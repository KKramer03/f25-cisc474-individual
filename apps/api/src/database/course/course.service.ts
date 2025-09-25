import { Injectable } from '@nestjs/common';
import { type Course } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async find(courseID: string): Promise<Course | null> {
    const course: Course | null = await this.prisma.course.findUnique({
      where: {
        course_id: courseID,
      },
    });
    return course;
  }

  async findAll(): Promise<Course[] | null> {
    const courses: Course[] = await this.prisma.course.findMany();
    return courses;
  }
}
