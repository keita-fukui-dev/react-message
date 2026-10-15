import ChatListItem from "./ChatListItem";

function ChatList({ chats, selectedChatId, onSelect }) {
  return (
    <aside className="chat-list">
      <h1 className="chat-list__title">チャット</h1>
      <ul className="chat-list__items">
        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isSelected={chat.id === selectedChatId}
            onSelect={() => onSelect(chat.id)}
          />
        ))}
      </ul>
    </aside>
  );
}

export default ChatList;
