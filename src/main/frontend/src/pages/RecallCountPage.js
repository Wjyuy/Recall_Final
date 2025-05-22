// src/pages/RecallCountPage.js
// 중복 리콜 모델 목록을 출력하는 페이지입니다.
import React, { useEffect, useState } from 'react';
import { fetchRepeatedModels } from '../services/StaticrecallApiService'; // 또는 해당 서비스 파일의 경로
import axios from 'axios';

// API 기본 URL (환경 변수 또는 직접 정의)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


function RecallCountPage() {
  const [repeatedModels, setRepeatedModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepeatedModels = async () => {
      setLoading(true);
      setError(null);
      try {
        // fetchRepeatedModels 서비스 함수를 호출하여 데이터를 가져옵니다.
        // 서비스 함수가 백엔드 API_BASE_URL/repeatedModels를 호출할 것입니다.
        const responseData = await fetchRepeatedModels({}); // params가 필요 없으면 빈 객체 전달

        // ★★★ 여기가 중요합니다: 백엔드에서 Map으로 감싸서 보내므로 'repeatedModels' 키로 접근해야 합니다. ★★★
        if (responseData && responseData.repeatedModels) {
          setRepeatedModels(responseData.repeatedModels);
        } else {
          // 데이터가 없거나 형식이 예상과 다를 경우 처리
          setRepeatedModels([]);
          console.warn("Expected 'repeatedModels' array in response, but got:", responseData);
        }

      } catch (err) {
        setError('중복 리콜 모델 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRepeatedModels();
  }, []);

  if (loading) return <div>중복 리콜 모델 목록을 불러오는 중입니다...</div>;
  if (error) return <div style={{ color: 'red' }}>오류: {error}</div>;

  return (
    <section id="repeated-models-section" className="starter-section section">
      <div className="container" data-aos="fade-up">
        <div className="section-title text-center">
          <h2 className="title">중복 리콜 모델 목록</h2>
        </div>

        <div className="widgets-container">
          {repeatedModels && repeatedModels.length > 0 ? (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>모델명</th>
                  <th>횟수</th>
                </tr>
              </thead>
              <tbody>
                {repeatedModels.map((model) => (
                  <tr key={model.model_name}> {/* 모델명이 고유하다고 가정, 아니면 다른 고유 id 사용 */}
                    <td>{model.model_name}</td>
                    <td>{model.count}회</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>반복 리콜된 모델이 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default RecallCountPage;