// src/pages/RecallDetail.js
import React, { useState, useEffect } from 'react';
import { useNavigate,useParams, Link } from 'react-router-dom';
import { fetchRecallDetail } from '../services/recallApiService'; // API 서비스 임포트

function RecallDetail() {
    const { id } = useParams(); // URL 파라미터에서 리콜 ID를 가져옵니다. (예: /recall_detail/123 -> id = "123")
    const [recall, setRecall] = useState(null); // 리콜 상세 정보를 저장할 상태
    const [similarIds, setSimilarIds] = useState([]); // 유사 리콜 ID를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate();

    const handleGoToList = () => {
        navigate('/recall_list');
    };
    useEffect(() => {
        const loadRecallDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                // API 서비스에서 상세 정보를 가져옵니다.
                // fetchRecallDetail 함수는 DTO와 similarIds를 포함하는 객체를 반환하도록 가정합니다.
                const data = await fetchRecallDetail(id);

                setRecall(data.recall); // 리콜 DTO (혹은 `Defect_DetailsDTO`)
                setSimilarIds(data.similarIds || []); // 유사 리콜 ID 배열

            } catch (err) {
                console.error(`리콜 상세 정보 (ID: ${id})를 가져오는 데 실패했습니다:`, err);
                setError("리콜 상세 정보를 불러오는 데 실패했습니다. 서버 상태를 확인해주세요.");
            } finally {
                setLoading(false);
            }
        };

        if (id) { // ID가 있을 때만 데이터 로드를 시도합니다.
            loadRecallDetail();
        }
    }, [id]); // id가 변경될 때마다 데이터를 다시 로드합니다.

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>리콜 상세 정보를 불러오는 중입니다...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>오류: {error}</div>;
    if (!recall) return <div style={{ textAlign: 'center', padding: '20px' }}>리콜 정보를 찾을 수 없습니다.</div>;

    return (
        <main id="main">

            {/* Starter Section Section */}
            <section id="starter-section" className="starter-section section">
                <div className="container" data-aos="fade-up">
                    <div className="section-title text-center">
                        <h2 className="title">리콜 상세 정보</h2>
                    </div>

                    <div className="widgets-container detail-widgets-container" >
                        <table className="table-custom" style={{ width: '100%', margin: '0 auto', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <th>리콜 번호</th>
                                    <td><b>{recall.id}</b></td>
                                </tr>
                                <tr>
                                    <th>제품명</th>
                                    <td>{recall.product_name}</td>
                                </tr>
                                <tr>
                                    <th>제조사</th>
                                    <td>{recall.manufacturer}</td>
                                </tr>
                                <tr>
                                    <th>제조기간</th>
                                    <td>{recall.manufacturing_period}</td>
                                </tr>
                                <tr>
                                    <th>기타정보</th>
                                    <td>{recall.additional_info}</td>
                                </tr>
                                <tr>
                                    <th>모델명</th>
                                    <td>{recall.model_name}</td>
                                </tr>
                                <tr>
                                    <th>리콜유형</th>
                                    <td>{recall.recall_type}</td>
                                </tr>
                                <tr>
                                    <th>연락처</th>
                                    <td>{recall.contact_info}</td>
                                </tr>
                            </tbody>
                        </table>
                    {/* 유사 리콜 추천 */}
                    <div style={{ marginTop: '30px' }}>
                        <div className="section-title text-center">
                        <h3 className="title">유사 리콜 추천</h3>
                        </div>
                        <div className='center-group-container'>
                            {similarIds.length > 0 ? (
                                similarIds.map(sid => (
                                <Link
                                    key={sid}
                                    to={`/recall_detail/${sid}`}
                                    style={{
                                    display: 'inline-block', // 인라인 블록 요소로 만들어 크기 조절 가능하게
                                    padding: '8px 15px',     // 패딩으로 버튼처럼 보이게
                                    backgroundColor: '#f0f0f0', // 연한 회색 배경
                                    color: '#333',          // 진한 글씨색
                                    textDecoration: 'none', // 밑줄 제거
                                    borderRadius: '5px',    // 모서리 둥글게
                                    border: '1px solid #ddd', // 얇은 테두리
                                    fontSize: '0.9rem',     // 글씨 크기 조절
                                    transition: 'background-color 0.3s ease', // 호버 효과
                                    }}
                                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#e0e0e0'} // 호버 시 배경색 변경
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}  // 호버 아웃 시 원래대로
                                >
                                {sid}번 리콜 보기
                            </Link>
                            ))
                        ) : (
                            <p>유사 리콜이 없습니다.</p>
                        )}
                        </div>
                        <button
                            type="button"
                            className='round-button'
                            onClick={handleGoToList} 
                            style={{
                                marginTop: '20px'
                            }}
                            >
                            목록으로
                        </button>
                    </div>

                    </div>

                </div>
            </section>
        </main>
    );
}

export default RecallDetail;