'use client';

import React, { useState } from 'react';
import styles from './ChatBot.module.css';
import ChatContainer from './ChatContainer';

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  // When open, the floating button could be hidden or still visible underneath the overlay
  // We'll hide it slightly with z-index if overlay takes over, or just keep it
  return (
    <>
      <button 
        className={styles.floatingButton} 
        onClick={toggleChat}
        aria-label="Open UniBot Chat"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      <ChatContainer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default FloatingChatBot;
