import { format } from "date-fns";

// メッセージやチャット一覧に表示する時刻（例: 14:15）
export const formatTime = (date) => format(date, "HH:mm");

// ツールチップ用の詳細な日時（例: 2024/01/15 14:15）
export const formatDateTime = (date) => format(date, "yyyy/MM/dd HH:mm");
