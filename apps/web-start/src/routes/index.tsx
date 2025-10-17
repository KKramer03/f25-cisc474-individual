import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@repo/ui/button';
import styles from '../page.module.css';
import NavButton from '../components/NavButton';

const navButtons: { buttonName: string; pageTarget: string }[] = [
  { buttonName: 'Home', pageTarget: '/' },
  { buttonName: 'Courses', pageTarget: './courses' },
  { buttonName: 'Assignments', pageTarget: './assignments' },

  { buttonName: 'Calendar', pageTarget: './calendar' },
  { buttonName: 'Inbox', pageTarget: './inbox' },
];

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Current pages</h1>
        <ol>
          <li>Courses</li>
          <li>Courses --&gt; Course</li>
          <li>Coures --&gt; Course -&gt; Grades</li>
          <li>Assignments</li>
          <li>Inbox</li>
        </ol>

        <h1>Current Data Retrieval</h1>
        <ol>
          <li>Fetch courses</li>
          <li>Fetch content by course</li>
          <li>Fetch grades by course</li>
          <li>Fetch messages</li>
        </ol>

        <h1>
          CRUD Actions can be performed on Courses Page, input fields at bottom
        </h1>

        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden="true"
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.com?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            aria-hidden="true"
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.com →
        </a>

        {navButtons.map(({ buttonName, pageTarget }) => (
          <NavButton
            key={buttonName}
            buttonName={buttonName}
            className={styles.secondary}
            pageTarget={pageTarget}
          />
        ))}
      </footer>
    </div>
  );
}
