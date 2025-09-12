import Image, { type ImageProps } from 'next/image';
import { Button } from '@repo/ui/button';
import NavButton from './components/NavButton';
import styles from './page.module.css';
import Link from 'next/link';
import { NavButtonProps } from './components/NavButton';

type Props = Omit<ImageProps, 'src'> & {
  srcLight: string;
  srcDark: string;
};

const navButtons: { buttonName: string; pageTarget: string }[] = [
  { buttonName: 'Home', pageTarget: '/' },
  { buttonName: 'Courses', pageTarget: './courses' },
  { buttonName: 'Assignments', pageTarget: './assignments' },

  { buttonName: 'Calendar', pageTarget: './calendar' },
  { buttonName: 'Inbox', pageTarget: './calendar/inbox' },
];

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
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
          <Image
            aria-hidden
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
          <Image
            aria-hidden
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

        {/* For comparison, a regular Link component */}
        <Link href="./courses">Courses</Link>
      </footer>
    </div>
  );
}
