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
  CourseUpdateInput,
} from '../../../../../api/src/database/course/course.types';

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

  const mutation = useMutation({
    mutationFn: ({
      method,
      data,
    }: {
      method: 'POST' | 'PATCH' | 'DELETE';
      data: CourseCreateInput;
    }) => {
      return mutateBackend<CourseCreateOutput>(`/course/create`, method, data);
    },

    onMutate: async (variables) => {
      // Cancel any outgoing refetches, so they don't overwrite placeholder data
      await queryClient.cancelQueries({ queryKey: ['courses'] });
      const previous = queryClient.getQueryData<Array<Course>>(['courses']);

      const tempId = `${Math.random().toString(36).slice(2)}`;
      const placeholderId = `${Math.random().toString(36).slice(2)}`;
      const tempCourse = {
        // Create a tempID and placeholder ID for loading state
        course_id: tempId,
        placeholder_id: placeholderId,
        courseName: 'Loading...',
        description: variables.data.description ?? '',
        instructor: variables.data.instructor,
      };

      queryClient.setQueryData(
        // Update current data optimistically (with placeholder)
        ['courses'],
        (old: Array<Course> | undefined) => {
          return old ? [...old, tempCourse] : [tempCourse];
        },
      );

      return { previous, placeholderId };
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
      _variables,
      context: { placeholderId?: string } | any,
    ) => {
      // Update query cache with previous courses and replace placeholder
      try {
        const createdCourse = data;
        if (context?.placeholderId) {
          queryClient.setQueryData(
            ['courses'],
            (old: Array<Course> | undefined) => {
              if (!old) return old; // & Type intersection, combines Course Object with optional placeholder_id field
              return old.map((course: Course & { placeholder_id?: string }) =>
                course.placeholder_id === context.placeholderId
                  ? createdCourse
                  : course,
              );
            },
          );
        }
      } catch (e) {}

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
        <footer
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
            mutation={mutation.mutate}
            className={styles.secondary}
            disabled={mutation.isPending}
          />
          <MutationButton<CourseUpdateInput> // update button
            data={{
              course_id: '0165f0ca-53e5-4637-8e29-e01f330c49e5', // example course_id to update
              courseName: courseNameInput || undefined,
              description: descriptionInput || undefined,
              instructor: instructorInput || undefined,
            }}
            method="PATCH"
            mutation={mutation.mutate}
            className={styles.secondary}
            disabled={mutation.isPending}
          />
        </footer>
      </div>
    </div>
  );
}
