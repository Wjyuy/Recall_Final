// src/pages/DefectDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns'; // 날짜 포맷팅을 위한 라이브러리 (필요시)

// API 서비스를 임포트합니다.
// 아직 이 API 함수가 없다면 아래 fetchDefectDetail 함수 예시를 참고하여 추가해주세요.
import { fetchDefectDetail, checkPassword } from '../services/defectApiService'; // 예시

function DefectDetail() {
    const { id } = useParams(); // URL에서 'id' 파라미터를 가져옵니다. 예: /defect_detail/123
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const [defect, setDefect] = useState(null); // 결함 상세 정보를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null);   // 에러 상태

    useEffect(() => {
        const loadDefectDetail = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchDefectDetail(id); // API 서비스 호출
                setDefect(data); // 데이터를 상태에 저장
            } catch (err) {
                console.error("결함 상세 정보를 가져오는 데 실패했습니다:", err);
                setError("결함 상세 정보를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (id) { // id가 있을 때만 데이터 로드
            loadDefectDetail();
        }
    }, [id]); // id가 변경될 때마다 effect 재실행

    // 비밀번호 확인 페이지로 이동 (수정 버튼 클릭 시)
    const handleModifyClick = () => {
        // JSP 코드의 pwCheck 로직을 React에서는 별도의 페이지로 이동시켜 처리
        // 예: 비밀번호 입력 모달 또는 비밀번호 확인 페이지로 이동
        navigate(`/defect_pwcheck/${id}`); // 비밀번호 확인 페이지 경로 예시
    };

    // 목록보기 버튼 클릭 시
    const handleToListClick = () => {
        navigate('/defect_list'); // 신고 내역 목록 페이지로 이동
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>정보를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>오류: {error}</div>;
    }

    if (!defect) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>해당 신고 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <main id="main">

            <section id="starter-section" className="starter-section section" style={{ padding: '40px 0' }}>
                <div className="container" data-aos="fade-up">
                    <div className="section-title text-center">
                        <h2 className="title">신고 상세 내역</h2>
                    </div>

                    <div className="widgets-container">
                        {/* JSP에서 <form> 태그는 버튼을 감쌌지만, React에서는 비동기 통신이므로 불필요 */}
                        <table className="table-custom" width="500" border="1" style={{ margin: '0 auto' }}>
                            <tbody>
                                <tr>
                                    <td>번호</td>
                                    <td>{defect.id}</td>
                                    <td>신고자</td>
                                    <td>{defect.reporter_name}</td>
                                    <td>신고일</td>
                                    <td>{defect.report_date ? format(new Date(defect.report_date), 'yyyy-MM-dd') : '날짜 없음'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <hr />
                        <br />
                        <table className="table-custom" border="1" style={{ margin: '0 auto' }}>
                            <tbody>
                                <tr>
                                    <td width="100" height="80">신고유형</td>
                                    <td>
                                        {defect.report_type === 'A' ? '자동차' : defect.report_type === 'B' ? '이륜차' : defect.report_type}
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100" height="80">모델명</td>
                                    <td>{defect.car_model}</td>
                                </tr>
                                <tr>
                                    <td width="100" height="80">제조사</td>
                                    <td>{defect.car_manufacturer}</td>
                                </tr>
                                <tr>
                                    <td width="100" height="80">제조일자</td>
                                    <td>
                                        {defect.car_manufacturing_date ? format(new Date(defect.car_manufacturing_date), 'yyyy-MM-dd') : '날짜 없음'}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="download-btn-group">
                            <button
                                type="button"
                                onClick={handleModifyClick}
                                style={{ marginRight: '12px' }}
                            >
                                수정
                            </button>
                            <button
                                type="button"
                                onClick={handleToListClick}
                                style={{backgroundColor: '#6c757d'}}
                            >
                                목록보기
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default DefectDetail;