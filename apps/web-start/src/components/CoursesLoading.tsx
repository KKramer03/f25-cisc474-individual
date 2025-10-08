import styles from '../page.module.css';
import custom from '../custom.module.css';

export default function CoursesLoading() {
  const buttonSkeletons = Array.from({ length: 6 }, (_, index) => (
    <button key={index} className={custom.courseButton}>
      Loading...
    </button>
  ));

  return (
    <div className={styles.secondary}>
      <div className={custom.customDefaults}>
        <div className={custom.coursesGrid}>{buttonSkeletons}</div>
      </div>
    </div>
  );
}
