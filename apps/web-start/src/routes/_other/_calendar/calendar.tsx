import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_other/_calendar/calendar')({
  component: calendarPage,
});

function calendarPage() {
  return <div>Calendar Page</div>;
}
