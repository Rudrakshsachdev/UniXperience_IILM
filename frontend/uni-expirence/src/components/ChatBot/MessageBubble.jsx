import React from 'react';
import styles from './ChatBot.module.css';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  // Basic formatting: bold text wrapped in **
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={`${styles.messageWrapper} ${isUser ? styles.user : styles.bot}`}>
      <div className={styles.messageBubble}>
        <p>{formatText(message.text)}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
