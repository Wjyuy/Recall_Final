// src/pages/FaqWritePage.js (수정)
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FormEditor from '../components/FormEditor'; // FormEditor import

function FaqWritePage() {
  const navigate = useNavigate();
  const initialFaqData = { question: '', answer: '' };
  // FormEditor에 전달할 필드 정의
  const fields = [
    { name: 'question', type: 'text', placeholder: '질문', required: true },
    { name: 'answer', type: 'textarea', placeholder: '내용', required: true, rows: 8 },
  ];

  // FAQ 제출 로직
  const handleFaqSubmit = async (formData) => {
    // const API_URL = 'http://localhost:8485/api/faqs/write'; // FAQ 작성 API 경로
    const API_URL = `${process.env.REACT_APP_API_BASE_URL}/faqs/write`; // FAQ 작성 API 경로

    // 백엔드 FaqsDTO 필드에 맞게 formData를 가공할 수 있음
    // 예: const payload = { ...formData, writer: '관리자' };

    await axios.post(API_URL, formData); // 데이터 전송

    // 성공 후 FAQ 목록으로 이동
    setTimeout(() => {
      navigate('/notice'); // FAQ 목록 페이지 라우트
    }, 1500);
  };

  return (
      <section id="starter-section" className="starter-section section">
      <div className="detail-widgets-container" data-aos="fade-up">
        <div className="section-title text-center">
            <h2 className="title">FAQ 작성</h2>
        </div>

        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
              <FormEditor
                  fields={fields}
                  onSubmit={handleFaqSubmit}
                  initialData={initialFaqData} // 처음 렌더링 시에만 사용됨
                  submitButtonText="FAQ 작성하기"
              />
        </div>
        <button
            type="button"
            onClick={() => window.location.href = '/notice'}
            className='buttons'>목록으로</button>
        </div>
      </div>
    </section>
  );
}

export default FaqWritePage;