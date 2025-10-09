'use client';
import { createFileRoute } from '@tanstack/react-router';

import { styleText } from 'util';
import styles from '../../../page.module.css';
import custom from '../../../custom.module.css';
import Panel from '../../../components/Panel';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { create } from 'domain';

export const Route = createFileRoute('/_academic/assignments/')({
  component: AssignmentsPage,
});

const sections = [
  // List of sectiions that willl be mapped and displayed on the page
  {
    title: 'Section 1',
    assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
  },
  {
    title: 'Section 2',
    assignments: ['Assignment 4', 'Assignment 5', 'Assignment 6'],
  },
  {
    title: 'Section 3',
    assignments: ['Assignment 7', 'Assignment 8', 'Assignment 9'],
  },
];

const upcomingAssignments: string[] = [
  // Modify this later to dynamically fetch upcoming assignments
  'Assignment 1 - 10/25',
  'Assignment 2 - 10/30',
  'Assignment 3 - 11/05',
];

function AssignmentsPage() {
  const [openSection, setOpenSection] = useState<boolean[]>(
    Array(sections.length).fill(false), // Create a state array to track which sections are open
  );

  return (
    <div className={styles.secondary}>
      <div className={custom.customDefaults}>
        <div className={custom.gridWrapper}>
          <div style={{ textAlign: 'center', marginTop: '2vw' }}>
            <h3>Upcoming Assignments</h3>
            {upcomingAssignments.map((assignment, index) => (
              <p key={index}>{assignment}</p>
            ))}
          </div>
          <div>
            {sections.map(
              (
                section,
                index, // Map over sections to create accordion buttons
              ) => (
                <div key={index}>
                  <button
                    className={custom.sectionButton}
                    onClick={() => {
                      // On click function to toggle the open state of the section
                      const newOpenSection = [...openSection];
                      newOpenSection[index] = !newOpenSection[index];
                      setOpenSection(newOpenSection);
                    }}
                  >
                    {section.title}
                  </button>
                  {openSection[index] && ( // Conditionally render the panel if the section is open
                    (<Panel>
                      {section.assignments.map((assignment, i) => (
                        <p key={i}>{assignment}</p>
                      ))}
                    </Panel>)
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
