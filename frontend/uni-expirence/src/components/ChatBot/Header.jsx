import React from 'react';
import styles from './ChatBot.module.css';

const Header = ({ onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.botIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </div>
        <h2 className={styles.headerTitle}>UniBot</h2>
      </div>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close Chat">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default Header;
