import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';

const InputBox = ({ onSend, disabled, suggestions }) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSend(inputText.trim());
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!disabled) {
      onSend(suggestion);
    }
  };

  return (
    <div className={styles.inputArea}>
      {suggestions && suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map((s, index) => (
            <button 
              key={index}
              className={styles.suggestionChip}
              onClick={() => handleSuggestionClick(s)}
              disabled={disabled}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form 
        className={`${styles.inputForm} ${disabled ? styles.disabled : ''}`} 
        onSubmit={handleSubmit}
      >
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Ask UniBot something..."
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows="1"
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={disabled || !inputText.trim()}
          aria-label="Send message"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default InputBox;
