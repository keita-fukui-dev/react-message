import { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const canSend = text.trim() !== "";

  const send = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };

  // Enter で送信、Shift+Enter で改行（日本語入力の変換確定中は送信しない）
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <textarea
        className="message-input__textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="メッセージを入力（Enterで送信 / Shift+Enterで改行）"
        rows={2}
      />
      <button type="submit" className="button button--primary" disabled={!canSend}>
        送信
      </button>
    </form>
  );
}

export default MessageInput;
