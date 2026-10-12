import { useState } from "react";
import { currentUser, dummyChats, dummyMessages } from "./data";
import ChatList from "./components/ChatList";
import MessageWindow from "./components/MessageWindow";
import EditModal from "./components/EditModal";
import "./App.css";

function App() {
  const [messagesByChat, setMessagesByChat] = useState(dummyMessages);
  const [selectedChatId, setSelectedChatId] = useState(dummyChats[0].id);
  const [editingMessage, setEditingMessage] = useState(null);
  // スマホ幅では一覧と会話のどちらか一方だけを表示する
  const [isListOpenOnMobile, setIsListOpenOnMobile] = useState(false);

  const selectedChat = dummyChats.find((chat) => chat.id === selectedChatId);
  const selectedMessages = messagesByChat[selectedChatId] ?? [];

  // 送信・編集・削除が一覧にも反映されるよう、直近メッセージは現在の状態から求める
  const chats = dummyChats.map((chat) => {
    const messages = messagesByChat[chat.id] ?? [];
    return { ...chat, lastMessage: messages[messages.length - 1] ?? null };
  });

  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
    setIsListOpenOnMobile(false);
  };

  const updateMessages = (chatId, update) => {
    setMessagesByChat((prev) => ({
      ...prev,
      [chatId]: update(prev[chatId] ?? []),
    }));
  };

  const handleSend = (content) => {
    const newMessage = {
      id: crypto.randomUUID(),
      content,
      sender: currentUser,
      timestamp: new Date(),
      isRead: true,
    };
    updateMessages(selectedChatId, (messages) => [...messages, newMessage]);
  };

  const handleSaveEdit = (content) => {
    updateMessages(selectedChatId, (messages) =>
      messages.map((message) =>
        message.id === editingMessage.id ? { ...message, content } : message,
      ),
    );
    setEditingMessage(null);
  };

  const handleDelete = (messageId) => {
    if (!window.confirm("このメッセージを削除しますか？")) return;
    updateMessages(selectedChatId, (messages) =>
      messages.filter((message) => message.id !== messageId),
    );
  };

  return (
    <div className={`app${isListOpenOnMobile ? " app--list-open" : ""}`}>
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onSelect={handleSelectChat}
      />
      <MessageWindow
        chat={selectedChat}
        messages={selectedMessages}
        onSend={handleSend}
        onEdit={setEditingMessage}
        onDelete={handleDelete}
        onBack={() => setIsListOpenOnMobile(true)}
      />
      {editingMessage && (
        <EditModal
          message={editingMessage}
          onSave={handleSaveEdit}
          onClose={() => setEditingMessage(null)}
        />
      )}
    </div>
  );
}

export default App;
