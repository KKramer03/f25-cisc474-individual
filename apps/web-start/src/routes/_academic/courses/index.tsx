import { createFileRoute } from '@tanstack/react-router';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import NavButton from '../../../components/NavButton';
// import type { Course } from '@repo/database/generated/client';
import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
import CoursesLoading from '../../../components/CoursesLoading';
import { backendFetcher, mutateBackend } from '../../../integrations/fetcher';
import MutationButton from '../../../components/MutationButton';
import type { Course } from '@repo/database/generated/client';
import type {
  CourseCreateInput,
  CourseCreateOutput,
  CourseDeleteInput,
  CourseUpdateInput,
} from '../../../../../api/src/database/course/course.types';

// Reusable type-guard to narrow out `undefined` values for TypeScript
const isDefined = <T,>(v: T | undefined): v is T => v !== undefined;

export const Route = createFileRoute('/_academic/courses/')({
  component: coursePage,
});

function coursePage() {
  return (
    <Suspense fallback={<CoursesLoading />}>
      <CoursesList />
    </Suspense>
  );
}

function CoursesList() {
  const retrievedCourses = useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<Course>>(`/course/all`),
  });
  const queryClient = useQueryClient();
  const [courseNameInput, setCourseNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [instructorInput, setInstructorInput] = useState('');

  const [updateCourseIdInput, setUpdateCourseIdInput] = useState('');
  const [updateCourseNameInput, setUpdateCourseNameInput] = useState('');
  const [updateDescriptionInput, setUpdateDescriptionInput] = useState('');
  const [updateInstructorInput, setUpdateInstructorInput] = useState('');

  const [deleteCourseIdInput, setDeleteCourseIdInput] = useState('');

  const mutation = useMutation({
    mutationFn: ({
      method,
      data,
    }: {
      method: 'POST' | 'PATCH' | 'DELETE';
      data: CourseCreateInput | CourseUpdateInput;
    }) => {
      if (method === 'POST') {
        return mutateBackend<CourseCreateOutput>(
          `/course/create`,
          method,
          data,
        );
      } else if (method === 'PATCH') {
        return mutateBackend<CourseUpdateInput>(
          `/course/update?course_id=${(data as CourseUpdateInput).course_id}`,
          method,
          data,
        );
      } else {
        // DELETE
        return mutateBackend<CourseDeleteInput>(
          `/course/delete?course_id=${(data as CourseDeleteInput).course_id}`,
          method,
          data,
        );
      }
    },

    onMutate: async (variables) => {
      // Cancel any outgoing refetches, so they don't overwrite placeholder data
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData<Array<Course>>(['courses']);

      if (variables.method === 'POST' || variables.method === 'PATCH') {
        const tempId =
          variables.method === 'POST'
            ? `${Math.random().toString(36).slice(2)}`
            : (variables.data as CourseUpdateInput).course_id;
        // const tempId = `${Math.random().toString(36).slice(2)}`;
        const placeholderId = `${Math.random().toString(36).slice(2)}`;
        const tempCourse = {
          // Create a tempID and placeholder ID for loading state
          course_id: tempId,
          placeholder_id: placeholderId,
          courseName: 'Loading...',
          description: variables.data.description ?? '',
          instructor: variables.data.instructor,
        };

        if (variables.method === 'POST') {
          queryClient.setQueryData(
            // Update current data optimistically (with placeholder)
            ['courses'],
            (old: Array<Course> | undefined) => {
              return old ? [...old, tempCourse] : [tempCourse];
            },
          );
        } else {
          // PATCH
          // use top-level isDefined helper
          queryClient.setQueryData(
            ['courses'],
            (old: Array<Course> | undefined) => {
              if (!old) return old;
              return old.map((course: Course) =>
                course.course_id ===
                (variables.data as CourseUpdateInput).course_id
                  ? {
                      ...course,
                      ...Object.fromEntries(
                        Object.entries(
                          variables.data as Record<string, unknown>,
                        ).filter(([_, value]) => isDefined(value)),
                      ),
                    } // merge updates into placeholder, filtering out undefined values as specified by type-guard
                  : course,
              );
            },
          );
        }
        return { previous, placeholderId };
      } else {
        // DELETE
        queryClient.setQueryData(
          // Update current data optimistically (with placeholder)
          ['courses'],
          (old: Array<Course> | undefined) => {
            if (!old) return old;
            return old.filter(
              (course: Course) =>
                course.course_id !==
                (variables.data as CourseDeleteInput).course_id,
            );
          },
        );
        return { previous };
      }
    },

    // Revert placeholder and refetch on error
    onError: (context: { previous?: Array<Course> } | undefined) => {
      // rollback to previous data
      if (context?.previous) {
        queryClient.setQueryData(['courses'], context.previous);
      }
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },

    onSuccess: async (
      data,
      variables,
      context: { placeholderId?: string } | any,
    ) => {
      // Update query cache with previous courses and replace placeholder
      if (variables.method === 'POST') {
        try {
          const createdCourse = data;
          if (context?.placeholderId) {
            queryClient.setQueryData(
              ['courses'],
              (old: Array<Course> | undefined) => {
                if (!old) return old; // & Type intersection, combines Course Object with optional placeholder_id field
                return old.map(
                  (course: Course & { placeholder_id?: string }) =>
                    course.placeholder_id === context.placeholderId
                      ? createdCourse
                      : course,
                );
              },
            );
          }
        } catch (e) {}
      }

      // do nothing for PATCH onSuccess since we already updated optimistically
      // DELETE also does not need any special handling here

      // Ensure authoritative data from the backend
      await queryClient.invalidateQueries({ queryKey: ['courses'] });

      // clear the inputs on success
      try {
        setCourseNameInput('');
        setDescriptionInput('');
        setInstructorInput('');
      } catch (e) {
        // noop
      }
    },
  });

  const results: Array<Course> = retrievedCourses.data;
  // Nest.js backend running on port 3000, retrieve all courses from designated endpoint
  // Loading.js should be displayed while waiting for response

  const courseButtons = results.map((course) => ({
    ...course,
    pageTarget: './$course',
  })); // Convert course names to lowercase and replace spaces with dashes for URL

  return (
    <div className={styles.secondary}>
      <div className={custom.customDefaults}>
        <div>
          <div className={custom.coursesGrid}>
            {courseButtons.map(({ courseName, pageTarget, course_id }) => (
              <NavButton
                key={course_id}
                buttonName={courseName}
                pageTarget={pageTarget}
                search={{ course_id: course_id }}
                params={{
                  course: courseName.toLowerCase().replace(/\s+/g, '-'),
                }}
                className={custom.courseButton}
              />
            ))}

            {/* {mutation.isPending && (
              <NavButton
                key={'pending'}
                buttonName={'Loading...'}
                pageTarget={'#'}
                search={{}}
                params={{}}
                className={custom.courseButton}
              />
            )} */}
          </div>
        </div>
        <footer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <input
              type="text"
              placeholder="Course Name"
              value={courseNameInput}
              onChange={(e) => setCourseNameInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Instructor ID"
              value={instructorInput}
              onChange={(e) => setInstructorInput(e.target.value)}
            />
            <MutationButton<CourseCreateInput> // use inputs as data
              data={{
                courseName: courseNameInput || 'New Course',
                description: descriptionInput || 'Course Description',
                instructor:
                  instructorInput || '0165f0ca-53e5-4637-8e29-e01f330c49e5',
              }}
              method="POST"
              name="Add Course"
              mutation={mutation.mutate}
              className={styles.secondary}
              disabled={mutation.isPending}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <input
              type="text"
              placeholder="Course ID"
              value={updateCourseIdInput}
              onChange={(e) => setUpdateCourseIdInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Name"
              value={updateCourseNameInput}
              onChange={(e) => setUpdateCourseNameInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={updateDescriptionInput}
              onChange={(e) => setUpdateDescriptionInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Instructor ID"
              value={updateInstructorInput}
              onChange={(e) => setUpdateInstructorInput(e.target.value)}
            />
            <MutationButton<CourseUpdateInput>
              data={{
                // require an explicit course_id to avoid accidentally updating the wrong course
                course_id: updateCourseIdInput,
                courseName: updateCourseNameInput || undefined,
                description: updateDescriptionInput || undefined,
                instructor:
                  updateInstructorInput ||
                  '0165f0ca-53e5-4637-8e29-e01f330c49e5',
              }}
              method="PATCH"
              name="Update Course"
              mutation={mutation.mutate}
              className={styles.secondary}
              disabled={mutation.isPending || !updateCourseIdInput}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <input
              type="text"
              placeholder="Course ID"
              value={deleteCourseIdInput}
              onChange={(e) => setDeleteCourseIdInput(e.target.value)}
            />
            <MutationButton<CourseDeleteInput>
              data={{
                course_id: deleteCourseIdInput,
              }}
              method="DELETE"
              name="Delete Course"
              mutation={mutation.mutate}
              className={styles.secondary}
              disabled={mutation.isPending || !deleteCourseIdInput}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
