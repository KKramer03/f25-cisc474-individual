import NavButton, { NavButtonProps } from '../../components/NavButton';
import type { Course } from '@repo/database/generated/client';
import styles from '../../page.module.css';
import custom from '../../custom.module.css';
import { env } from 'process';

export default async function coursePage() {
  // const courseButtons: NavButtonProps[] = [
  //   { buttonName: 'Economics', pageTarget: '/courses/economics' },
  //   { buttonName: 'Mathematics', pageTarget: '/courses/mathematics' },
  //   { buttonName: 'Physics', pageTarget: '/courses/physics' },
  //   { buttonName: 'Chemistry', pageTarget: '/courses/chemistry' },
  //   { buttonName: 'Biology', pageTarget: '/courses/biology' },
  //   { buttonName: 'Computer Science', pageTarget: '/courses/computer-science' },
  // ];

  process.loadEnvFile('../../.env'); // Load environment variables from .env file

  const backendSource = process.env.BACKEND_URL;

  const retrievedCourses = await fetch(`${backendSource}/course/all`);
  const results: Course[] = await retrievedCourses.json();
  // Nest.js backend running on port 3000, retrieve all courses from designated endpoint
  // Loading.js should be displayed while waiting for response

  const courseButtons = results.map((course) => ({
    ...course,
    pageTarget: `/courses/${course.courseName.toLowerCase().replace(/\s+/g, '-')}?course_id=${course.course_id}`,
  })); // Convert course names to lowercase and replace spaces with dashes for URL

  return (
    <div className={styles.secondary}>
      <div className={custom.customDefaults}>
        {/* <div>Courses Page</div> */}
        <div>
          <div className={custom.coursesGrid}>
            {courseButtons.map(({ courseName, pageTarget, course_id }) => (
              <NavButton
                key={course_id}
                buttonName={courseName}
                pageTarget={pageTarget}
                className={custom.courseButton}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
