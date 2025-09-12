import NavButton, { NavButtonProps } from '../../components/NavButton';
import styles from '../../page.module.css';
import custom from '../../custom.module.css';

export default function coursePage() {
  const courseButtons: NavButtonProps[] = [
    { buttonName: 'Economics', pageTarget: '/courses/economics' },
    { buttonName: 'Mathematics', pageTarget: '/courses/mathematics' },
    { buttonName: 'Physics', pageTarget: '/courses/physics' },
    { buttonName: 'Chemistry', pageTarget: '/courses/chemistry' },
    { buttonName: 'Biology', pageTarget: '/courses/biology' },
    { buttonName: 'Computer Science', pageTarget: '/courses/computer-science' },
  ];

  return (
    <div className={styles.secondary}>
      <div className={custom.customDefaults}>
        {/* <div>Courses Page</div> */}
        <div>
          <div className={custom.coursesGrid}>
            {courseButtons.map(({ buttonName, pageTarget }) => (
              <NavButton
                key={buttonName}
                buttonName={buttonName}
                pageTarget={pageTarget}
                className={custom.courseButton}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
