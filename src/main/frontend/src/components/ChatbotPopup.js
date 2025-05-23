// components/ChatbotPopup.js
import React, { useState, useRef, useEffect } from 'react';
import './ChatbotPopup.css';
import { askChatbot } from '../services/chatbotApi'; // ⭐️ 챗봇 API 서비스 임포트

function ChatbotPopup({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false); // 챗봇이 타이핑 중인지 나타내는 상태
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // 컴포넌트 마운트 시 초기 메시지 설정 (선택 사항)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: '안녕하세요! 자동차 결함 및 리콜에 대해 궁금한 점을 질문해주세요.', sender: 'bot' }]);
    }
  }, [isOpen, messages.length]);



  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMsg = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInputMessage('');
    setIsTyping(true); // 챗봇 타이핑 시작

    try {
      // ⭐️ Spring Boot 백엔드 API 호출
      const botResponse = await askChatbot(userMsg.text);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prevMessages) => [...prevMessages, { text: '죄송합니다. 챗봇 응답을 가져오지 못했습니다.', sender: 'bot' }]);
    } finally {
      setIsTyping(false); // 챗봇 타이핑 종료
    }
  };

  // 챗봇 응답 로직 제거 (백엔드에서 처리)
  // const getBotResponse = (userMessage) => { /* ... */ };

  if (!isOpen) return null;

  return (
    <div className={`chatbot-popup ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header">
        <h4>챗봇 상담</h4>
        <button onClick={onClose} className="close-button">
          &times;
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="message bot typing-indicator">...</div>} {/* 타이핑 인디케이터 */}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input-area">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          id="chatbot-input"
          name="messageInput"
          disabled={isTyping} // 챗봇 타이핑 중에는 입력 비활성화
        />
        <button type="submit" disabled={isTyping || inputMessage.trim() === ''}>
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatbotPopup;