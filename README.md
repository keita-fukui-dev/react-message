# react-message

React で作った、2カラム構成のメッセージアプリです。左にチャットの一覧、右に選択中のチャットの会話を表示します。

デプロイ先：https://react-message-six.vercel.app

## できること

- チャットの一覧表示と切り替え（一覧には最新メッセージと時刻を表示）
- メッセージの送信（Enter で送信、Shift+Enter で改行）
- 自分のメッセージの編集（モーダル）と削除（確認ダイアログ）
- スマホ幅（640px 以下）では、一覧と会話を切り替えて表示

データは `src/data.js` のダミーデータを使っていて、保存はしていません。ページを再読み込みすると初期状態に戻ります。

## 使っているもの

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/)
- [date-fns](https://date-fns.org/)（日時の表示）
- [Oxlint](https://oxc.rs/)（コードのチェック）

## 起動方法

```bash
npm install
npm run dev
```

表示された URL（通常は http://localhost:5173 ）をブラウザで開きます。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | 本番用にビルドする（`dist/` に出力） |
| `npm run preview` | ビルドしたものをローカルで確認する |
| `npm run lint` | Oxlint でコードをチェックする |

## ファイル構成

```
src/
  main.jsx                 エントリーポイント
  App.jsx                  状態の管理（メッセージ・選択中のチャット・編集中のメッセージ）
  App.css / index.css      スタイル
  data.js                  ダミーデータ
  utils/
    formatTime.js          日時の表示形式
    sortByTimestamp.js     メッセージを送信日時の順に並べる
  components/
    ChatList.jsx           チャットの一覧
    ChatListItem.jsx       一覧の1行
    MessageWindow.jsx      会話の画面
    MessageItem.jsx        メッセージ1件（吹き出し）
    MessageInput.jsx       入力欄と送信ボタン
    EditModal.jsx          編集用のモーダル
```
