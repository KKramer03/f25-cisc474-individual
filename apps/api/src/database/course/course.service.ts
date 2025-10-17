import { Injectable } from '@nestjs/common';
import { type Course } from '@repo/database/generated/client';
import { PrismaService } from 'src/prisma.service';
import {
  CourseCreateInput,
  CourseCreateOutput,
  CourseUpdateInput,
} from './course.types';

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

  async create(body: CourseCreateInput): Promise<CourseCreateOutput> {
    const { instructor, ...rest } = body;

    const newCourse: CourseCreateOutput = await this.prisma.course.create({
      data: {
        courseName: rest.courseName,
        instructor: instructor
          ? { connect: { user_id: instructor } }
          : { connect: { user_id: '0165f0ca-53e5-4637-8e29-e01f330c49e5' } }, // default instructor if none provided for testing
        description: rest.description ?? null,
      },
    });

    return newCourse;
  }

  async update(courseID: string, body: CourseUpdateInput): Promise<any> {
    const { instructor, ...rest } = body;
    const updatedCourse = await this.prisma.course.update({
      where: { course_id: courseID },
      data: {
        ...rest,
        instructor: instructor
          ? { connect: { user_id: instructor } }
          : undefined, // do nothing with instructor if not provided
      },
    });
    return updatedCourse;
  }

  async delete(courseID: string): Promise<any> {
    const deletedCourse = await this.prisma.course.delete({
      where: { course_id: courseID },
    });
    return deletedCourse;
  }
}
