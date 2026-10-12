import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

function MessageWindow({ chat, messages, onSend, onEdit, onDelete, onBack }) {
  const bottomRef = useRef(null);

  const sortedMessages = [...messages].sort(
    (a, b) => a.timestamp - b.timestamp,
  );

  // スレッド切替時・メッセージ追加時に最新メッセージまでスクロール
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [chat.id, messages.length]);

  return (
    <main className="message-window">
      <header className="message-window__header">
        <button
          type="button"
          className="message-window__back"
          onClick={onBack}
          aria-label="チャット一覧に戻る"
        >
          ‹
        </button>
        <div>
          <h2 className="message-window__name">{chat.name}</h2>
          <p className="message-window__type">
            {chat.type === "group" ? "グループチャット" : "個人チャット"}
          </p>
        </div>
      </header>
      <div className="message-window__messages">
        {sortedMessages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            onEdit={() => onEdit(message)}
            onDelete={() => onDelete(message.id)}
          />
        ))}
        <div ref={bottomRef} />
      </div>
      <MessageInput key={chat.id} onSend={onSend} />
    </main>
  );
}

export default MessageWindow;
