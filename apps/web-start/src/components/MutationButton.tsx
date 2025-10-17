type MutationButtonProps<T> = {
  mutation: ({
    method,
    data,
  }: {
    method: 'POST' | 'PATCH' | 'DELETE';
    data: T;
  }) => void;
  data: T;
  method: 'POST' | 'PATCH' | 'DELETE';
  className?: string;
  disabled?: boolean;
};

export default function MutationButton<T>({
  mutation,
  data,
  method,
  className,
  disabled,
}: MutationButtonProps<T>) {
  return (
    <button
      className={className}
      onClick={() => !disabled && mutation({ method: method, data })}
      disabled={disabled}
      style={{ display: 'inline' }}
    >
      Add Course
    </button>
  );
}
