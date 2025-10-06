// import type { Course } from '@repo/database/generated/client';
import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
import NavButton from '../../../components/NavButton';
import Section from '../../../components/SectionButton';

export default function Loading() {
  const sections: { section: string; assignments: string[] }[] = [
    {
      section: 'Assignments',
      assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
    },
    {
      section: 'Quizzes',
      assignments: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
    },
    {
      section: 'Videos, Links, and Readings',
      assignments: ['Reading 1', 'Reading 2', 'Reading 3'],
    },
  ];

  const upcomingContent: { title: string; type: string; date: string }[] = [
    { title: 'Lecture 1', type: 'Lecture', date: '2024-09-01' },
    { title: 'Assignment 1', type: 'Assignment', date: '2024-09-05' },
    { title: 'Quiz 1', type: 'Quiz', date: '2024-09-10' },
  ];

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
            {/* <NavButton // Placeholder button while loading
              buttonName="Grades"
              pageTarget={''}
              className={styles.secondary}
            /> */}
          </div>
          <div
            style={{
              gridColumn: '1/3',
              gridRow: 2,
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <h2>Upcoming Content</h2>
            {upcomingContent.map((content, index) => (
              <div key={index} className={styles.contentItem}>
                <p>
                  {content.type}: {content.title} - {content.date}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              gridColumn: '2/5',
              gridRow: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {sections.map((section, index) => (
              <div key={index}>
                <Section // Placeholder section button with empty state while loading
                  className={custom.sectionButton}
                  sectionName={section.section}
                  index={index}
                />
              </div>
            ))}
          </div>
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
