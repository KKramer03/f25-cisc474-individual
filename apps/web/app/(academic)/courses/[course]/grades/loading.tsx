import React from 'react';
import custom from '../../../../custom.module.css';

export default function Loading() {
  // Example grade listings; replace with real data as needed
  const gradeListings: {
    assignmentName: string;
    type: string;
    score: number;
    percentage: string;
    weightedPercentage: string;
  }[] = [
    {
      assignmentName: 'Loading',
      type: 'N/A',
      score: 0,
      percentage: 'N/A',
      weightedPercentage: 'N/A',
    },
  ];

  return (
    <div className={custom.customDefaults}>
      <div className={custom.courseGridWrapper}>
        <div className={custom.gradeGrid}>
          <p>Name</p>
          <p>Type</p>
          <p>Score</p>
          <p>Max Score</p>
          <p>Percentage</p>
          {gradeListings.map((grade, idx) => (
            <React.Fragment key={idx}>
              <p>{grade.assignmentName}</p>
              <p>{grade.type}</p>
              <p>{grade.score}</p>
              <p>{grade.percentage}</p>
              <p>{grade.weightedPercentage}</p>
            </React.Fragment>
          ))}
        </div>
        <div style={{ gridColumn: 1, gridRow: 2, textAlign: 'center' }}>
          <h3>Weighting</h3>
          <p>Test: 50%</p>
          <p>Quiz: 25%</p>
          <p>Attendance: 10%</p>
          <p>Project: 15%</p>
        </div>
        <div className={custom.gradeGrid}></div>
        <div style={{ gridColumn: 5, gridRow: 2, textAlign: 'center' }}>
          Grade Total
          <h3 style={{ fontSize: '64px' }}>N/A</h3>
        </div>
      </div>
    </div>
  );
}
