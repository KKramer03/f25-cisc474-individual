'use client';

import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
import Section from '../../../components/SectionButton';
import { use, useState } from 'react';
import NavButton from '../../../components/NavButton';

export default function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = use(params);
  // const sections: string[] = ['Section 1', 'Section 2', 'Section 3'];
  const sections: { section: string; assignments: string[] }[] = [
    {
      section: 'Section 1',
      assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
    },
    {
      section: 'Section 2',
      assignments: ['Assignment 4', 'Assignment 5', 'Assignment 6'],
    },
    {
      section: 'Section 3',
      assignments: ['Assignment 7', 'Assignment 8', 'Assignment 9'],
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
  const [openSection, setOpenSection] = useState<boolean[]>(
    Array(sections.length).fill(false), // Create a state array to track which sections are open
  );

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
              pageTarget={`/courses/${course}/grades`}
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
                <Section
                  className={custom.sectionButton}
                  sectionName={section.section}
                  index={index}
                  setState={setOpenSection}
                  state={openSection}
                />
                {openSection[index] && (
                  <div>
                    {section.assignments.map((assignment, idx) => (
                      <div key={idx}>{assignment}</div>
                    ))}
                  </div>
                )}
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
