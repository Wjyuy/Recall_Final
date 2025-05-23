// components/ChatbotPopup.js
import React, { useState, useRef, useEffect, useCallback } from 'react'; // useCallback 추가
import './ChatbotPopup.css';
import { askChatbot } from '../services/chatbotApi';

function ChatbotPopup({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [hasGreeted, setHasGreeted] = useState(false);

  // ⭐️ 드래그 기능을 위한 상태와 Ref
  const popupRef = useRef(null); // 팝업 DOM 요소를 참조
  const [isDragging, setIsDragging] = useState(false); // 드래그 중인지 여부
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 마우스와 팝업 모서리 간의 오프셋
  const [position, setPosition] = useState({ // 팝업의 현재 위치 (px 단위)
    x: window.innerWidth - 320 - 20, // 초기 right: 20px, width: 320px
    y: window.innerHeight - 450 - 80 // 초기 bottom: 80px, height: 450px
  });

  // 메시지 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // 초기 인사 메시지
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages([{ text: '안녕하세요! 자동차 결함 및 리콜에 대해 궁금한 점을 질문해주세요.', sender: 'bot' }]);
      setHasGreeted(true);
    }
  }, [isOpen, hasGreeted]);

  // ⭐️ 드래그 시작 핸들러
  const handleMouseDown = useCallback((e) => {
    if (!popupRef.current) return;

    setIsDragging(true);
    // 마우스 클릭 위치와 팝업의 현재 위치 사이의 오프셋 계산
    setOffset({
      x: e.clientX - popupRef.current.getBoundingClientRect().left,
      y: e.clientY - popupRef.current.getBoundingClientRect().top,
    });
  }, []);

  // ⭐️ 드래그 중 핸들러
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    // 새 위치 계산 (마우스 위치 - 오프셋)
    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    // 화면 경계 제한 (선택 사항: 팝업이 화면 밖으로 나가지 않도록)
    const maxX = window.innerWidth - popupRef.current.offsetWidth;
    const maxY = window.innerHeight - popupRef.current.offsetHeight;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({ x: newX, y: newY });
  }, [isDragging, offset]);

  // ⭐️ 드래그 종료 핸들러
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ⭐️ 마우스 이벤트 리스너 추가/제거 (useEffect 사용)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMsg = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const botResponse = await askChatbot(userMsg.text);
      setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prevMessages) => [...prevMessages, { text: '죄송합니다. 챗봇 응답을 가져오지 못했습니다.', sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) return null;

  return (
    // ⭐️ ref와 인라인 스타일로 위치 제어
    <div
      ref={popupRef}
      className={`chatbot-popup ${isOpen ? 'open' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }} // ⭐️ left, top 속성 사용
    >
      <div
        className="chatbot-header"
        onMouseDown={handleMouseDown} // ⭐️ 헤더에 마우스 다운 이벤트 추가
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }} // ⭐️ 드래그 중 커서 변경
      >
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
        {isTyping && <div className="message bot typing-indicator">...</div>}
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
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || inputMessage.trim() === ''}>
          전송
        </button>
      </form>
    </div>
  );
}

export default ChatbotPopup;