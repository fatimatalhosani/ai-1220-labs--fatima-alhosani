import { useState } from 'react';
import { INBOX } from './data.js';

export default function Inbox() {
  const [messages, setMessages] = useState(INBOX);
  const [deleted, setDeleted] = useState(null);

  function handleDelete(id) {
    setMessages((list) => {
      const index = list.findIndex((message) => message.id === id);
      if (index === -1) return list;
      setDeleted({ message: list[index], index });
      return list.filter((message) => message.id !== id);
    });
  }

  function handleUndo() {
    if (!deleted) return;
    setMessages((list) => {
      const next = [...list];
      next.splice(Math.min(deleted.index, next.length), 0, deleted.message);
      return next;
    });
    setDeleted(null);
  }

  return (
    <>
      <ul className="inbox">
        {messages.map((message) => (
          <li key={message.id}>
            <div><strong>{message.from}</strong><span>{message.subject}</span></div>
            <button
              type="button"
              className="icon"
              aria-label={`Delete ${message.subject}`}
              onClick={() => handleDelete(message.id)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
      {deleted && (
        <p role="status" className="result">
          Message deleted <button type="button" onClick={handleUndo}>Undo</button>
        </p>
      )}
    </>
  );
}
