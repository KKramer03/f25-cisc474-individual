import { prisma } from './client';
import { faker } from '@faker-js/faker';

import type { User } from '../generated/client';
import {
  fakeUserComplete,
  fakeCourseComplete,
  fakeEnrollmentComplete,
  fakeRoleComplete,
  fakeGradeComplete,
  fakeMessagesComplete,
  fakeAssignedRoleComplete,
  fakeContentComplete,
} from '../types/fake-data';

function getRandomArrayElement<T>(arr: T[]): T | undefined {
  return arr[Math.floor(Math.random() * arr.length)];
}

const users = Array.from({ length: 100 }, () => fakeUserComplete());
import type { RoleType } from '../generated/client';
import { skip } from '@prisma/client/runtime/library';

const roles = [
  {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: 'ADMIN' as RoleType,
  },
  {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: 'INSTRUCTOR' as RoleType,
  },
  {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: 'TEACHING_ASSISTANT' as RoleType,
  },
  {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: 'STUDENT' as RoleType,
  },
  {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: 'UNASSIGNED' as RoleType,
  },
];
const courses = Array.from({ length: 10 }, () => {
  const randomUser = getRandomArrayElement(users);
  return fakeCourseComplete(randomUser?.user_id ?? '0');
});

const content = Array.from({ length: 200 }, () => {
  const randomCourse = getRandomArrayElement(courses);
  return fakeContentComplete(randomCourse?.course_id ?? '0');
});

const enrollments = Array.from({ length: 500 }, () => {
  const randomUser = getRandomArrayElement(users);
  const randomCourse = getRandomArrayElement(courses);
  return fakeEnrollmentComplete(
    randomUser?.user_id ?? '0',
    randomCourse?.course_id ?? '0',
  );
});
const grades = Array.from({ length: 1000 }, () => {
  const randomEnrollment = getRandomArrayElement(enrollments);
  return fakeGradeComplete(randomEnrollment?.enrollment_id ?? '0');
});
const messages = Array.from({ length: 1000 }, () => {
  const randomSender = getRandomArrayElement(users);
  const randomReceiver = getRandomArrayElement(users);
  return fakeMessagesComplete(
    randomSender?.user_id ?? '0',
    randomReceiver?.user_id ?? '0',
  );
});

(async () => {
  try {
    // await Promise.all(
    //   users.map((user) =>
    //     prisma.user.upsert({
    //       where: {
    //         email: user.email!,
    //       },
    //       update: {
    //         ...user,
    //         displayName: user.displayName ?? 'Default Name',
    //         user_id: user.user_id ?? undefined,
    //         email: user.email!,
    //       },
    //       create: {
    //         ...user,
    //         displayName: user.displayName ?? 'Default Name',
    //         user_id: user.user_id ?? undefined,
    //         email: user.email!,
    //       },
    //     }),
    //   ),
    // );
    await prisma.user.createMany({
      data: users,
      skipDuplicates: true, // Skip duplicates based on the unique constraint (email)
    });

    await prisma.course.createMany({
      data: courses,
      skipDuplicates: true,
    });

    await prisma.content.createMany({
      data: content,
      skipDuplicates: true,
    });

    await prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    });

    await prisma.assignedRole.createMany({
      data: users.map((user) =>
        fakeAssignedRoleComplete(
          user.user_id,
          roles[Math.floor(Math.random() * roles.length)]?.role_id ?? '0',
        ),
      ),
      skipDuplicates: true,
    });

    await prisma.enrollment.createMany({
      data: enrollments,
      skipDuplicates: true,
    });

    await prisma.grade.createMany({
      data: grades,
      skipDuplicates: true,
    });

    await prisma.messages.createMany({
      data: messages,
      skipDuplicates: true,
    });

    console.log('Seeding completed.');
    console.log(`Inserted ${users.length} users.`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
