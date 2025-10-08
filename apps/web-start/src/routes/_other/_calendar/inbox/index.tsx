import { createFileRoute } from '@tanstack/react-router';
import InboxPage from '../../../../components/InboxPage';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_other/_calendar/inbox/')({
  component: inboxPage,
});

function inboxPage() {
  // const messages = [
  //   'example 1',
  //   'example 2',
  //   'example 3',
  //   'example 4',
  //   'example 5',
  //   'example 6',
  //   'example 7',
  //   'example 8',
  //   'example 9',
  // ];

  // const TestMessage = await (
  //   await fetch(
  //     'http://localhost:3000/message?message_id=00173bdd-a75e-4378-a573-b3f92bab851d',
  //   )
  // ) //use one sender, lag when querying all messages
  //   .json();

  // const TestMessage2 = await (
  //   await fetch(
  //     'http://localhost:3000/message?message_id=02249409-7cca-4f1c-a380-6d5853761111',
  //   )
  // ) //use one sender, lag when querying all messages
  //   .json();

  // let messages = [];
  // messages[0] = TestMessage;
  // messages[1] = TestMessage2;

  // process.loadEnvFile();

  const backendSource = process.env.BACKEND_URL;

  const messageResponse = useQuery({
    queryKey: ['messages'],
    queryFn: async (): Promise<Array<any>> => {
      const response = await fetch(`http://localhost:3000/message/all`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    },
  });

  const messages: Array<any> = messageResponse.data ?? [];

  // const usersWithMessages = Array.from(
  //   new Set(messages.map((msg: { sender_id: string }) => msg.sender_id)),
  // ); // Maps through messages and extracts unique sender_id's (set removes duplicates)

  return <InboxPage messages={messages} />;
}
