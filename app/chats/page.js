import { Suspense } from 'react';
import ChatsPageClient from './ChatsPageClient';

function ChatsFallback() {
  return (
    <main className="dc-page-shell">
      <div className="dc-chat-layout">
        <section className="dc-card dc-panel">
          <div className="dc-kicker">Chats</div>
          <h2>Conversations</h2>
          <div className="dc-notice">Loading chats...</div>
        </section>

        <section className="dc-card dc-panel">
          <div className="dc-notice">Loading chat...</div>
        </section>
      </div>
    </main>
  );
}

export default function ChatsPage() {
  return (
    <Suspense fallback={<ChatsFallback />}>
      <ChatsPageClient />
    </Suspense>
  );
}