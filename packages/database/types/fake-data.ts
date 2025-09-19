import { RoleType, ContentType } from '../generated/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';

export function fakeUser() {
  return {
    displayName: faker.lorem.words(5),
    email: faker.internet.email(),
  };
}
export function fakeUserComplete() {
  return {
    user_id: faker.string.uuid(),
    displayName: faker.person.fullName(),
    email: faker.internet.email(),
  };
}
export function fakeAssignedRoleComplete(user: string, role: string) {
  return {
    assigned_role_id: faker.string.uuid(),
    userId: user,
    roleId: role,
  };
}
export function fakeRole() {
  return {
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([
      RoleType.ADMIN,
      RoleType.INSTRUCTOR,
      RoleType.TEACHING_ASSISTANT,
      RoleType.STUDENT,
      RoleType.UNASSIGNED,
    ] as const),
  };
}
export function fakeRoleComplete() {
  return {
    role_id: faker.string.uuid(),
    name: faker.lorem.word(),
    type: faker.helpers.arrayElement([
      RoleType.ADMIN,
      RoleType.INSTRUCTOR,
      RoleType.TEACHING_ASSISTANT,
      RoleType.STUDENT,
      RoleType.UNASSIGNED,
    ] as const),
  };
}
export function fakeEnrollmentComplete(user: string, course: string) {
  return {
    enrollment_id: faker.string.uuid(),
    userId: user,
    courseId: course,
  };
}
export function fakeCourse() {
  return {
    courseName: faker.lorem.words({ min: 1, max: 3 }),
    description: undefined,
  };
}
export function fakeCourseComplete(instructor: string) {
  return {
    course_id: faker.string.uuid(),
    courseName: faker.lorem.words({ min: 1, max: 3 }),
    description: undefined,
    instructorId: instructor,
  };
}
export function fakeContent() {
  return {
    type: faker.helpers.arrayElement([
      ContentType.ASSIGNMENT,
      ContentType.QUIZ,
      ContentType.TEXT,
      ContentType.VIDEO,
      ContentType.LINK,
    ] as const),
    title: faker.lorem.words({ min: 1, max: 3 }),
    body: faker.lorem.paragraph(),
  };
}
export function fakeContentComplete(course: string) {
  return {
    content_id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      ContentType.ASSIGNMENT,
      ContentType.QUIZ,
      ContentType.TEXT,
      ContentType.VIDEO,
      ContentType.LINK,
    ] as const),
    title: faker.lorem.words({ min: 1, max: 3 }),
    body: faker.lorem.paragraph(),
    courseId: course,
  };
}
export function fakeGrade() {
  return {
    assignment_name: faker.lorem.words({ min: 1, max: 3 }),
    date_posted: faker.date.past(),
    score: faker.number.float(),
  };
}
export function fakeGradeComplete(enrollmentId: string) {
  return {
    grade_id: faker.string.uuid(),
    assignment_name: faker.lorem.words({ min: 1, max: 3 }),
    date_posted: faker.date.past(),
    enrollmentId: enrollmentId,
    score: faker.number.float(),
  };
}
export function fakeMessages() {
  return {
    content: faker.lorem.sentences({ min: 1, max: 3 }),
    timestamp: faker.date.past(),
  };
}
export function fakeMessagesComplete(sender: string, receiver: string) {
  return {
    message_id: faker.string.uuid(),
    sender_id: sender,
    receiver_id: receiver,
    content: faker.lorem.sentences({ min: 1, max: 3 }),
    timestamp: faker.date.past(),
  };
}
