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
  name: string;
  className?: string;
  disabled?: boolean;
};

export default function MutationButton<T>({
  mutation,
  data,
  method,
  name,
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
      {name}
    </button>
  );
}
