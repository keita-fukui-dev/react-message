import { useEffect, useState } from "react";

function EditModal({ message, onSave, onClose }) {
  const [text, setText] = useState(message.content);
  const canSave = text.trim() !== "";

  // Esc キーで閉じる
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSave) onSave(text.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 id="edit-modal-title" className="modal__title">
          メッセージを編集
        </h2>
        <textarea
          className="modal__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          autoFocus
        />
        <div className="modal__actions">
          <button type="button" className="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" className="button button--primary" disabled={!canSave}>
            保存
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
