import { currentUser } from "../data";
import { formatDateTime, formatTime } from "../utils/formatTime";

function ChatListItem({ chat, isSelected, onSelect }) {
  const { lastMessage } = chat;
  const avatar = chat.participants[0]?.avatar;

  const preview = lastMessage
    ? `${lastMessage.sender.id === currentUser.id ? "あなた: " : ""}${lastMessage.content}`
    : "";

  return (
    <li>
      <button
        type="button"
        className={`chat-item${isSelected ? " chat-item--selected" : ""}`}
        onClick={onSelect}
      >
        <img className="avatar avatar--lg" src={avatar} alt={chat.name} />
        <div className="chat-item__body">
          <div className="chat-item__header">
            <span className="chat-item__name">{chat.name}</span>
            {lastMessage && (
              <time
                className="chat-item__time"
                dateTime={lastMessage.timestamp.toISOString()}
                title={formatDateTime(lastMessage.timestamp)}
              >
                {formatTime(lastMessage.timestamp)}
              </time>
            )}
          </div>
          <p className="chat-item__preview">{preview}</p>
        </div>
      </button>
    </li>
  );
}

export default ChatListItem;
