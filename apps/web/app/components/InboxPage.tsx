'use client';

import custom from '../custom.module.css';
import { useState } from 'react';
// import type { Messages } from '@repo/database/generated/client';
import ConversationButton from './ConversationButton';

export default function InboxPage({ messages }: { messages: Messages[] }) {
  const safeMessages = Array.isArray(messages) ? messages : [];
  const usersWithMessages = Array.from(
    new Set(safeMessages.map((msg: { sender_id: string }) => msg.sender_id)),
  ); // Maps through messages and extracts unique sender_id's (set removes duplicates)

  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );

  console.log('Messages:', safeMessages);

  return (
    <div className={custom.customDefaults}>
      <div className={custom.gridWrapper}>
        <div className={custom.MessageList}>
          <div className={custom.conversations}>
            <h2>Messages</h2> <p>Text</p>
            {usersWithMessages.map((userID) => (
              <ConversationButton
                key={userID}
                senderID={userID}
                conversationName={'User: ' + userID}
                setActiveConversation={setActiveConversation}
              />
            ))}
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
          <div className={custom.messageColumn}>
            {safeMessages
              .filter((message) => message.sender_id === activeConversation)
              .map((message, index) => (
                <div
                  key={message.message_id}
                  className={`${custom.message} ${
                    index % 2 === 1 ? custom.alignEnd : custom.alignStart
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              ))}
            {/* Map through messages in the conversation and display them */}
          </div>
        </div>
        <div className={custom.toolBar}>
          <h2></h2> {/*final column for actions like delete, archive, etc*/}
        </div>
      </div>
    </div>
  );
}
