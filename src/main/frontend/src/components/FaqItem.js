// components/FaqItem.js
import { useState } from 'react';
import './FaqItem.css';

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((open) => !open);

  return (
    <div className={`faq-item${isOpen ? ' faq-active' : ''}`}>
      <h3 
        onClick={toggleOpen} 
         style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingRight: 0 // 오른쪽 여백 제거
        }}>
        <img src="/assets/qna.png" alt="Q" style={{ width: 24, height: 24, verticalAlign: 'middle', marginRight: 8 }} />
        <span>{item.question}</span>
        <i 
          className={`faq-toggle bi ${isOpen ? 'bi-chevron-right' : 'bi-chevron-right'}`}
          style={{
            fontSize: 20,
            color: '#666',
            marginLeft: 8,
            alignSelf: 'center',
            position: 'static'
          }}
          ></i>
      </h3>
      <div className="faq-content" style={{ display: isOpen ? 'block' : 'none' }}>
        <p style={{ color: '#222' }}>{item.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;