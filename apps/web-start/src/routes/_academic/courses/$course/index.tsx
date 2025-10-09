import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import styles from '../../../../page.module.css';
import custom from '../../../../custom.module.css';
// import type { Content } from '@repo/database/generated/client';
import SectionWrapper from '../../../../components/SectionWrapper';
import NavButton from '../../../../components/NavButton';
import CourseLoading from '../../../../components/CourseLoading';
import { backendFetcher } from '../../../../integrations/fetcher';
import type { Content, Course } from '@repo/database/generated/client';

export const Route = createFileRoute(
  '/_academic/courses/$course/',
)({
  component: CoursePage,
  validateSearch: (search: Record<string, unknown>): { course_id: string } => {
    if (typeof search.course_id === 'string') {
      return {
        course_id: search.course_id,
      };
    }
    throw new Error('course_id is required and must be a string');
  },
});

function CoursePage() {
  return (
    <Suspense fallback={<CourseLoading />}>
      <CourseContent />
    </Suspense>
  );
}

function CourseContent() {
  const { course_id }: { course_id: string } = Route.useSearch();

  const courseResponse = useSuspenseQuery({
    queryKey: ['course', course_id],
    queryFn: backendFetcher<Array<Course>>(
      `/course/by-id?course_id=${course_id}`,
    ),
  });

  const courseContentResponse = useSuspenseQuery({
    queryKey: ['courseContent', course_id],
    queryFn: backendFetcher<Array<Content>>(
      `/content/by-course?course_id=${course_id}`,
    ),
  });

  const courseContent = courseContentResponse.data;
  const deadlineContent = courseContent.filter(
    (content: any) => content.type === 'ASSIGNMENT' || content.type === 'QUIZ',
  );

  const sections: Array<{ section: string; assignments: Array<string> }> = [
    {
      section: 'Assignments',
      assignments: deadlineContent
        .filter((content: any) => content.type === 'ASSIGNMENT')
        .map((content: any) => content.title),
    },
    {
      section: 'Quizzes',
      assignments: deadlineContent
        .filter((content: any) => content.type === 'QUIZ')
        .map((content: any) => content.title),
    },
    {
      section: 'Videos, Links, and Readings',
      assignments: courseContent
        .filter(
          (content: any) =>
            content.type !== 'QUIZ' && content.type !== 'ASSIGNMENT',
        )
        .map((content: any) => content.title),
    },
  ];

  const timeFormat = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const upcomingContent: Array<{
    contentID: string;
    title: string;
    type: string;
    date: string;
  }> = deadlineContent
    .filter(
      (content: any) => content.dueDate !== null,
      // && new Date(content.dueDate) > new Date(),
    ) // Get new array containing only content with due dates in the future
    // Comment out the second condition to show all content with due dates
    .sort((a: any, b: any) => {
      if (a.dueDate && b.dueDate) {
        // Sort the array by due date, with the earliest due date first
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0; // If either due date is null, consider them equal
    })
    .map((content: any) => ({
      // Map the sorted array to the display format
      contentID: content.content_id,
      title: content.title,
      type: content.type,
      date: content.dueDate // Check if dueDate is not null before formatting with timeFormat
        ? timeFormat.format(new Date(content.dueDate))
        : '',
    }));

  const messages: Array<{ sender: string; content: string; date: string }> = [
    {
      sender: 'Sender 1',
      content: 'Message content 1',
      date: '2024-09-01',
    },
    {
      sender: 'Sender 2',
      content: 'Message content 2',
      date: '2024-09-02',
    },
    {
      sender: 'Sender 3',
      content: 'Message content 3',
      date: '2024-09-03',
    },
  ];

  return (
    <div>
      {/* <div>Course Page for {course}</div> */}
      <div className={custom.customDefaults}>
        <div className={custom.courseGridWrapper}>
          <div
            style={{
              gridColumn: '2 / 5',
              gridRow: 1,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
          >
            <NavButton
              buttonName="Grades"
              pageTarget={`./grades`}
              search={{ course_id: course_id }}
              className={styles.secondary}
            />
          </div>
          <div
            style={{
              gridColumn: '1/3',
              gridRow: 2,
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: '25%',
            }}
          >
            <h2>Upcoming Content</h2>
            {upcomingContent.map((content) => (
              <div key={content.contentID} className={custom.contentWrapper}>
                <p>
                  {content.type}: <strong>{content.title}</strong> -{' '}
                  {content.date}
                </p>
              </div>
            ))}
          </div>
          <SectionWrapper sections={sections} />
          <div
            style={{
              gridColumn: '4/6',
              gridRow: 2,
              textAlign: 'center',
              marginLeft: '25%',
              marginRight: 'auto',
            }}
          >
            <h2>Recent messages</h2>
            {messages.map((message, index) => (
              <div key={index} className={styles.messageItem}>
                <p>
                  <strong>{message.sender}</strong> ({message.date}):{' '}
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
