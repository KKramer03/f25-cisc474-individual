'use client';

import { useState } from 'react';
import Section from './SectionButton';
import custom from '../custom.module.css';

export default function SectionWrapper({
  sections,
}: {
  sections: { section: string; assignments: string[] }[];
}) {
  const [openSection, setOpenSection] = useState<boolean[]>(
    Array(sections.length).fill(false), // Create a state array to track which sections are open
  );

  return (
    <div className={custom['section-wrapper']}>
      {' '}
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
                <div key={idx} className={custom.contentWrapper}>
                  {assignment}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
