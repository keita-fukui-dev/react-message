import { currentUser } from "../data";
import { formatDateTime, formatTime } from "../utils/formatTime";

function MessageItem({ message, onEdit, onDelete }) {
  const isMine = message.sender.id === currentUser.id;

  return (
    <div className={`message${isMine ? " message--mine" : ""}`}>
      <img
        className="avatar avatar--sm"
        src={message.sender.avatar}
        alt={message.sender.name}
      />
      <div className="message__body">
        <div className="message__bubble">
          <div className="message__meta">
            <span className="message__sender">
              {isMine ? "あなた" : message.sender.name}
            </span>
            <time
              className="message__time"
              dateTime={message.timestamp.toISOString()}
              title={formatDateTime(message.timestamp)}
            >
              {formatTime(message.timestamp)}
            </time>
          </div>
          <p className="message__content">{message.content}</p>
        </div>
        {isMine && (
          <div className="message__actions">
            <button type="button" className="link-button" onClick={onEdit}>
              編集
            </button>
            <button type="button" className="link-button" onClick={onDelete}>
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageItem;
