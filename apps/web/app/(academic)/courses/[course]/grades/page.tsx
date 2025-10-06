import React from 'react';
import custom from '../../../../custom.module.css';
import type { Grade } from '@repo/database/generated/client';

export default async function GradesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // needs to be async but need to rework client server component first
  // Example grade listings; replace with real data as needed
  // const gradeListings: {
  //   assignmentName: string;
  //   type: string;
  //   score: number;
  //   percentage: string;
  //   weightedPercentage: string;
  // }[] = [
  //   {
  //     assignmentName: 'Quiz 1',
  //     type: 'Quiz',
  //     score: 8,
  //     percentage: '80%',
  //     weightedPercentage: '20%',
  //   },
  //   {
  //     assignmentName: 'Test 1',
  //     type: 'Test',
  //     score: 45,
  //     percentage: '90%',
  //     weightedPercentage: '45%',
  //   },
  // ];

  // const coursePattern = new RegExp('courses/(.*)/');
  // const course = coursePattern.exec(usePathname() || '')?.[1];

  process.loadEnvFile();

  const backendSource = process.env.BACKEND_URL;

  const exampleUser = '12059e6c-4cef-4916-9f2a-0123de76c296';
  const courseID = (await searchParams).course_id as string;

  const response = await fetch(
    `${backendSource}/grade/user-course?user_id=${exampleUser}&course_id=${courseID}`,
  );
  const gradeListings: Grade[] = await response.json();

  const totalGrade = // Sum of all scores divided by sum of all max scores, rounded to 2 decimal places
    Math.round(
      (gradeListings.reduce(
        (totalScore, grade) => totalScore + (grade.score ?? 0),
        0,
      ) /
        gradeListings.reduce(
          (totalMax, grade) => totalMax + (grade.max_score ?? 0),
          0,
        )) *
        10000,
    ) / 100;

  return (
    <div className={custom.customDefaults}>
      <div className={custom.courseGridWrapper}>
        <div className={custom.gradeGrid}>
          <p>Name</p>
          <p>Type</p>
          <p>Score</p>
          <p>Max Score</p>
          <p>Percentage</p>
          {gradeListings.map((grade) => (
            <React.Fragment key={grade.grade_id}>
              <p>{grade.assignment_name}</p>
              <p>Placeholder</p>
              <p>{Math.round((grade.score ?? 0) * 100) / 100}</p>
              <p>{grade.max_score}</p>
              <p>{Math.round((grade.percentage ?? 0) * 100) / 100}%</p>
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
          <h3 style={{ fontSize: '64px' }}>
            {totalGrade ? `${totalGrade}%` : 'N/A'}
          </h3>
        </div>
      </div>
    </div>
  );
}
