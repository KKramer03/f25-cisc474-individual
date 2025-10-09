import React, { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import custom from '../../../../../custom.module.css';
import GradeLoading from '../../../../../components/GradeLoading';
import { backendFetcher } from '../../../../../integrations/fetcher';
import type { Grade } from '@repo/database/generated/client';

export const Route = createFileRoute(
  '/_academic/courses/$course/grades/',
)({
  component: GradesPage,
  validateSearch: (search: Record<string, unknown>): { course_id: string } => {
    if (typeof search.course_id === 'string') {
      return {
        course_id: search.course_id,
      };
    }
    throw new Error('course_id is required and must be a string');
  },
});

function GradesPage() {
  return (
    <Suspense fallback={<GradeLoading />}>
      <GradesContent />;
    </Suspense>
  );
}

function GradesContent() {
  const exampleUser = '12059e6c-4cef-4916-9f2a-0123de76c296';

  const { course_id } = Route.useSearch();
  const courseID = course_id;

  const response = useSuspenseQuery({
    queryKey: ['grades', exampleUser, courseID],
    queryFn: backendFetcher<Array<Grade>>(
      `/grade/user-course?user_id=${exampleUser}&course_id=${courseID}`,
    ),
  });

  const gradeListings: Array<any> = response.data;

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
