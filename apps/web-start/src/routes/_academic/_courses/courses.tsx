import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import NavButton from '../../../components/NavButton';
// import type { Course } from '@repo/database/generated/client';
import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
import CoursesLoading from '../../../components/CoursesLoading';
import { backendFetcher } from '../../../integrations/fetcher';
import type { Course } from '@repo/database/generated/client';

export const Route = createFileRoute('/_academic/_courses/courses')({
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
          </div>
        </div>
      </div>
    </div>
  );
}
