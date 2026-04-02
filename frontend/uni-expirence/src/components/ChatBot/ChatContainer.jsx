import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBot.module.css';
import Header from './Header';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { sendChatMessage } from '@/services/api';

const initialMessages = [
  { id: 1, text: "Hi there! I'm UniBot, your IILM Campus AI assistant. How can I help you today?", sender: "bot" }
];

const quickSuggestions = ["Notices", "Faculty", "FAQs", "Admissions"];

const ChatContainer = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  const overlayRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, messages, isTyping]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const newUserMessage = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);
    setError(null);

    try {
      // Call the API service
      const response = await sendChatMessage(text);
      
      const botMessage = { 
        id: Date.now() + 1, 
        text: response.message, 
        sender: 'bot' 
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError("Failed to get a response. Please try again later.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className={`${styles.chatOverlay} ${isOpen ? styles.open : ''}`}
      ref={overlayRef}
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
    >
      <div className={styles.chatContainer} role="dialog" aria-modal="true">
        <Header onClose={onClose} />
        
        <div className={styles.messageArea}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          {isTyping && (
            <div className={styles.typingIndicator}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          )}
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div ref={messagesEndRef} />
        </div>

        <InputBox 
          onSend={handleSendMessage} 
          disabled={isTyping} 
          suggestions={messages.length <= 2 ? quickSuggestions : []}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
