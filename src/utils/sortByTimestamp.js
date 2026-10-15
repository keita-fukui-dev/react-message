// メッセージを送信日時の古い順に並べた新しい配列を返す（元の配列は変更しない）
export const sortByTimestamp = (messages) =>
  [...messages].sort((a, b) => a.timestamp - b.timestamp);
