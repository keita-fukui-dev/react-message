import { useEffect, useRef, useState } from "react";

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

  // 背景のクリックで閉じる。押した場所と離した場所が違うと、ブラウザは共通の親（背景）で
  // click を発生させるので、入力欄の文字選択を背景までドラッグしても閉じないよう、
  // 押した場所も背景だったときだけ閉じる
  const isPointerDownOnOverlay = useRef(false);

  const handleOverlayPointerDown = (e) => {
    isPointerDownOnOverlay.current = e.target === e.currentTarget;
  };

  const handleOverlayClick = (e) => {
    if (isPointerDownOnOverlay.current && e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-overlay"
      onPointerDown={handleOverlayPointerDown}
      onClick={handleOverlayClick}
    >
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
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
