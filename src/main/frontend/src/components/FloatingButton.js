// components/FloatingButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동이 필요하다면
import './FloatingButton.css';

function FloatingButton({ type, onClick, style }) {
  const navigate = useNavigate();

  let buttonContent;
  let buttonAction = onClick; // 외부에서 전달된 onClick 함수 우선 사용

  switch (type) {
    case 'top':
      buttonContent = (
        <>
          <i className="bi bi-arrow-up-circle"></i>
          <span className="button-text">TOP</span>
        </>
      );
      if (!onClick) { // onClick이 따로 전달되지 않았다면 기본 동작 설정
        buttonAction = () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스크롤
          });
        };
      }
      break;
    case 'contact':
      buttonContent = (
        <>
          <i className="bi bi-question-circle"></i>
          <span className="button-text">문의</span>
        </>
      );
    //   if (!onClick) {
    //     buttonAction = () () => navigate('/contact-us'); // 예시: 문의 페이지로 이동
    //   }
      break;
    case 'chatbot':
        buttonContent = (
            <>
                <i className="bi bi-chat-dots"></i>
                <span className="button-text">챗봇</span>
            </>
        );
        // if (!onClick) {
        //     buttonAction = () => alert('챗봇 기능 준비중입니다!'); // 예시: 챗봇 기능 알림
        // }
        break;
    // 필요한 다른 타입들을 여기에 추가
    default:
      buttonContent = (
        <>
          <i className="bi bi-gear"></i>
          <span className="button-text">버튼</span>
        </>
      );
      if (!onClick) {
        buttonAction = () => alert('기본 버튼 클릭!');
      }
      break;
  }

  return (
    <button
      className={`floating-button ${type}`}
      onClick={buttonAction}
      title={type === 'top' ? '맨 위로' : type === 'contact' ? '문의하기' : type === 'chatbot' ? '챗봇 상담' : ''}
      style={style}
    >
      {buttonContent}
    </button>
  );
}

export default FloatingButton;