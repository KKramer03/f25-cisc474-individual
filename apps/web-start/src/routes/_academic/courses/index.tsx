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
  const [pendingCourse, setPendingCourse] = useState<boolean>(false);

  const retrievedCourses = useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<Course>>(`/course/all`),
  });

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

    onSuccess: () => {
      useQueryClient().invalidateQueries({ queryKey: ['courses'] }); // Invalidate and refetch, causing CoursesList to rerender with updated data
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

            {mutation.isPending && (
              <NavButton
                key={'pending'}
                buttonName={'Loading...'}
                pageTarget={'#'}
                search={{}}
                params={{}}
                className={custom.courseButton}
              />
            )}
          </div>
        </div>
        <footer
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <input type="text" placeholder="Course Name" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Instructor ID" />

          <MutationButton // test with hardcoded data for now
            data={{
              courseName: 'New Course',
              description: 'Course Description',
              instructor: '0165f0ca-53e5-4637-8e29-e01f330c49e5', // first user in fake data
            }}
            mutation={mutation.mutate}
            className={styles.secondary}
          />
        </footer>
      </div>
    </div>
  );
}
