'use client';

export default function Section({
  className,
  sectionName,
  index,
  setState,
  state,
}: {
  className?: string;
  sectionName: string;
  index: number;
  setState?: (state: boolean[]) => void;
  state?: boolean[];
}) {
  return (
    <button
      className={className}
      onClick={() => {
        const newState = [...(state || [])];
        newState[index] = !newState[index];
        setState?.(newState);
      }}
    >
      {sectionName}
    </button>
  );
}
