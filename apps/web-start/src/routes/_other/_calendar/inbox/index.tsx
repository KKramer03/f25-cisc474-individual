import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import InboxPage from '../../../../components/InboxPage';
import { backendFetcher } from '../../../../integrations/fetcher';

export const Route = createFileRoute('/_other/_calendar/inbox/')({
  component: inboxPage,
});

function inboxPage() {
  const messageResponse = useQuery({
    queryKey: ['messages'],
    queryFn: backendFetcher<Array<any>>(`/message/all`),
  });

  const messages: Array<any> = messageResponse.data ?? [];

  return <InboxPage messages={messages} />;
}
