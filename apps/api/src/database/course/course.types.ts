import * as z from 'zod';

export const CourseCreateInput = z.object({
  // course_id: z.string() // course_id will be auto-generated as defined in the Prisma schema
  courseName: z.string(),
  description: z.string().nullable(),
  instructor: z.string(),
});

export type CourseCreateInput = z.infer<typeof CourseCreateInput>;

export const CourseCreateOutput = z.object({
  course_id: z.string(),
  courseName: z.string(),
  description: z.string().nullable(),
  instructor: z.string(),
});

export type CourseCreateOutput = z.infer<typeof CourseCreateOutput>;

export const CourseUpdateInput = z.object({
  courseName: z.string().optional(),
  description: z.string().nullable().optional(),
  instructor: z.string().optional(),
});

export type CourseUpdateInput = z.infer<typeof CourseUpdateInput>;
