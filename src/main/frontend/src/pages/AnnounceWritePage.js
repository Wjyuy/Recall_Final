// src/pages/AnnounceWritePage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FormEditor from '../components/FormEditor'; // FormEditor import
import { useEffect } from 'react';

function AnnounceWritePage() {

  // ✅ JWT 인증 체크 useEffect
  const navigate = useNavigate();

  useEffect(() => {
	const token = localStorage.getItem("jwt_token");

	if (!token) {
		alert("관리자 로그인이 필요합니다.");
		navigate("/login");
		return;
	}

	// fetch("http://localhost:8485/api/admin/test-auth", {
	fetch("${process.env.REACT_APP_API_BASE_URL}/api/admin/test-auth", {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	})
		.then(res => {
			if (res.status !== 200)
       throw new Error("인증 실패");
		})
		.catch(err => {
			alert("접근 권한이 없습니다. 다시 로그인해주세요.");
			navigate("/login");
		});
  }, [navigate]);

  const initialAnnounceData = { title: '', content: '' }; 
  // FormEditor에 전달할 필드 정의
  const fields = [
    { name: 'title', type: 'text', placeholder: '제목', required: true },
    { name: 'content', type: 'textarea', placeholder: '내용', required: true, rows: 8 },
  ];

  // 공지사항 제출 로직
  const handleAnnounceSubmit = async (formData) => {
    // const API_URL = 'http://localhost:8485/api/announce/write'; // 공지사항 작성 API 경로
    const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/announce/write`;

    // 백엔드 AnnounceDTO 필드에 맞게 formData를 가공할 수 있음
    // 예: const payload = { ...formData, writer: '관리자' };

    await axios.post(API_URL, formData); // 데이터 전송

    // 성공 후 공지사항 목록으로 이동
    setTimeout(() => {
      navigate('/announce'); // 공지사항 목록 페이지 라우트
    }, 1500);
  };

  return (
    <section id="starter-section" className="starter-section section">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
            <h2 className="title">공지사항 작성</h2>
        </div>
        <main id="main">

          <section id="announce-write-section" className="announce-write-section section" style={{ padding: '40px 0' }}>
            <div className="container" data-aos="fade-up">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <FormEditor
                      fields={fields}
                      onSubmit={handleAnnounceSubmit}
                      initialData={initialAnnounceData}
                      submitButtonText="공지사항 작성하기"
                  />
                   <button
                    type="button"
                    onClick={() => window.location.href = '/announce'}
                    className='buttons'>목록으로</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}

export default AnnounceWritePage;