import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
// import type { Content } from '@repo/database/generated/client';
import SectionWrapper from '../../../components/SectionWrapper';
import NavButton from '../../../components/NavButton';

export default async function CoursePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // process.loadEnvFile(); // Load environment variables from .env file

  const backendSource = 'process.env.BACKEND_URL';

  const courseID = (await searchParams).course_id as string;
  const courseResponse = fetch(
    `https://f25-cisc474-individual-bgkq.onrender.com/course/?course_id=${courseID}`,
  );
  const courseContentResponse = fetch(
    `https://f25-cisc474-individual-bgkq.onrender.com/content/by-course?course_id=${courseID}`,
  );
  const course = await (await courseResponse).json();
  const courseContent = await (await courseContentResponse).json();
  const courseName = course.courseName.replace(/\s+/g, '-').toLowerCase();
  const deadlineContent = courseContent.filter(
    (content: any) => content.type === 'ASSIGNMENT' || content.type === 'QUIZ',
  );

  const sections: { section: string; assignments: string[] }[] = [
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

  const upcomingContent: {
    contentID: string;
    title: string;
    type: string;
    date: string;
  }[] = deadlineContent
    .filter(
      (content: any) => content.dueDate !== null,
      // && new Date(content.dueDate) > new Date(),
    ) // Get new array containing only content with due dates in the future
    // Comment out the second condition to show all content with due dates
    .sort((a: any, b: any) => {
      if (a.dueDate && b.dueDate) {
        //Sort the array by due date, with the earliest due date first
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

  const messages: { sender: string; content: string; date: string }[] = [
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
              pageTarget={`/courses/${courseName}/grades?course_id=${courseID}`}
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
