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
    displayName: faker.lorem.words(5),
    email: faker.internet.email(),
  };
}
export function fakeAssignedRoleComplete() {
  return {
    assigned_role_id: faker.string.uuid(),
    userId: faker.string.uuid(),
    roleId: faker.string.uuid(),
  };
}
export function fakeRole() {
  return {
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([RoleType.ADMIN, RoleType.INSTRUCTOR, RoleType.TEACHING_ASSISTANT, RoleType.STUDENT, RoleType.UNASSIGNED] as const),
  };
}
export function fakeRoleComplete() {
  return {
    role_id: faker.string.uuid(),
    name: faker.person.fullName(),
    type: faker.helpers.arrayElement([RoleType.ADMIN, RoleType.INSTRUCTOR, RoleType.TEACHING_ASSISTANT, RoleType.STUDENT, RoleType.UNASSIGNED] as const),
  };
}
export function fakeEnrollmentComplete() {
  return {
    enrollment_id: faker.string.uuid(),
    userId: faker.string.uuid(),
    courseId: faker.string.uuid(),
  };
}
export function fakeCourse() {
  return {
    courseName: faker.lorem.words(5),
    description: undefined,
  };
}
export function fakeCourseComplete() {
  return {
    course_id: faker.string.uuid(),
    courseName: faker.lorem.words(5),
    description: undefined,
    instructorId: faker.string.uuid(),
  };
}
export function fakeContent() {
  return {
    type: faker.helpers.arrayElement([ContentType.ASSIGNMENT, ContentType.QUIZ, ContentType.TEXT, ContentType.VIDEO, ContentType.LINK] as const),
    title: faker.lorem.words(5),
    body: faker.lorem.words(5),
  };
}
export function fakeContentComplete() {
  return {
    content_id: faker.string.uuid(),
    type: faker.helpers.arrayElement([ContentType.ASSIGNMENT, ContentType.QUIZ, ContentType.TEXT, ContentType.VIDEO, ContentType.LINK] as const),
    title: faker.lorem.words(5),
    body: faker.lorem.words(5),
    courseId: faker.string.uuid(),
  };
}
export function fakeGrade() {
  return {
    assignment_name: faker.lorem.words(5),
    date_posted: faker.date.anytime(),
    score: faker.number.float(),
  };
}
export function fakeGradeComplete() {
  return {
    grade_id: faker.string.uuid(),
    assignment_name: faker.lorem.words(5),
    date_posted: faker.date.anytime(),
    enrollmentId: faker.string.uuid(),
    score: faker.number.float(),
  };
}
export function fakeMessages() {
  return {
    content: faker.lorem.words(5),
    timestamp: faker.date.anytime(),
  };
}
export function fakeMessagesComplete() {
  return {
    message_id: faker.string.uuid(),
    sender_id: faker.string.uuid(),
    receiver_id: faker.string.uuid(),
    content: faker.lorem.words(5),
    timestamp: faker.date.anytime(),
  };
}
