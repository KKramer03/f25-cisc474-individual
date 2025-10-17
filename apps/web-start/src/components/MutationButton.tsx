import type { CourseCreateInput } from '../../../api/src/database/course/course.types';

type MutationButtonProps = {
  mutation: ({
    method,
    data,
  }: {
    method: 'POST' | 'PATCH' | 'DELETE';
    data: CourseCreateInput;
  }) => void;
  data: CourseCreateInput; // Data to be sent with the mutation
  className?: string;
};

export default function MutationButton({
  mutation,
  data,
  className,
}: MutationButtonProps) {
  return (
    <button
      className={className}
      onClick={() => mutation({ method: 'POST', data })}
      style={{ display: 'inline' }}
    >
      Add Course
    </button>
  );
}
