import custom from '../custom.module.css';
import '../globals.css';

export default function ConversationSection({
  conversationName,
  senderID,
  className,
  setActiveConversation,
}: {
  conversationName?: string;
  senderID?: string;
  className?: string;
  setActiveConversation: (conversation: string | null) => void;
}) {
  return (
    <button
      className={`${custom.conversationButton} ${className}`}
      onClick={() => setActiveConversation(senderID || null)}
    >
      {conversationName}
    </button>
  );
}
