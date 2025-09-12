import custom from '../../../custom.module.css';

export default function inboxPage() {
  return (
    <div className={custom.customDefaults}>
      <div className={custom.gridWrapper}>
        <div className={custom.MessageList}>
          <div className={custom.conversations}>
            <h2>Messages</h2>{' '}
            {/* make class for message column and child div}
        {/* Map through messages and display them */}
          </div>
          <div className={custom.announcements}>
            <h2>Announcements</h2>
            {/* Map through announcements and display them */}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2>Conversation with User</h2> {/* displays active conversation */}
        </div>
        <div className={custom.toolBar}>
          <h2></h2> {/*final column for actions like delete, archive, etc*/}
        </div>
      </div>
    </div>
  );
}
