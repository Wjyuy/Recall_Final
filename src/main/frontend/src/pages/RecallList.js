// src/pages/RecallList.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
// import { format } from 'date-fns'; // 필요시 사용 (리콜 데이터에 날짜 필드가 있다면)

import Pagination from '../components/Pagination';
import RecallListSearch from '../components/RecallListSearch'; // 새로 만든 검색 컴포넌트 임포트

import { fetchRecallReports, downloadRecallCsv, downloadRecallExcel } from '../services/recallApiService';

function RecallList() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // 초기 검색/페이징 조건 설정 (URL 파라미터에서 읽어옴)
    const getInitialSearchCriteria = useCallback(() => {
        return {
            type: searchParams.get('type') || '',
            keyword: searchParams.get('keyword') || '',
            pageNum: parseInt(searchParams.get('pageNum') || '1', 10),
            amount: parseInt(searchParams.get('amount') || '10', 10),
        };
    }, [searchParams]);

    const [searchCriteria, setSearchCriteria] = useState(getInitialSearchCriteria);
    const [recallList, setRecallList] = useState([]);
    const [pageMaker, setPageMaker] = useState({
        startPage: 1,
        endPage: 1,
        prev: false,
        next: false,
        total: 0,
        cri: { pageNum: 1, amount: 10, type: '', keyword: '' },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadRecallReports = useCallback(async (currentCriteria) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchRecallReports(currentCriteria);

            setRecallList(data.list || []);
            setPageMaker(data.pageMaker || {
                startPage: 1, endPage: 1, prev: false, next: false, total: 0, cri: currentCriteria
            });

            // URL 쿼리 파라미터 업데이트
            const cleanParams = {};
            for (const key in currentCriteria) {
                if (currentCriteria[key] !== '' && currentCriteria[key] !== null && currentCriteria[key] !== undefined) {
                    cleanParams[key] = currentCriteria[key];
                }
            }
            setSearchParams(new URLSearchParams(cleanParams).toString());

        } catch (err) {
            console.error("리콜 데이터를 가져오는 데 실패했습니다:", err);
            setError("리콜 데이터를 가져오는 데 실패했습니다. 서버 상태를 확인해주세요.");
            setRecallList([]);
            setPageMaker({ startPage: 1, endPage: 1, prev: false, next: false, total: 0, cri: currentCriteria });
        } finally {
            setLoading(false);
        }
    }, [setSearchParams]);

    useEffect(() => {
        const initialCri = getInitialSearchCriteria();
        setSearchCriteria(initialCri);
        loadRecallReports(initialCri);
    }, [getInitialSearchCriteria, loadRecallReports]);

    // 검색 조건 변경 핸들러 (RecallListSearch 컴포넌트에서 호출)
    const handleSearchChange = useCallback((newCri) => {
        // 검색 필드의 임시 변경만 반영 (즉시 API 호출하지 않음)
        setSearchCriteria(newCri);
    }, []);

    // 검색 제출 핸들러 (RecallListSearch 컴포넌트에서 호출)
    const handleSearchSubmit = useCallback((newCri) => {
        // 검색 조건을 최종적으로 적용하고 페이지를 1로 초기화하여 데이터 로드
        setSearchCriteria(newCri);
        loadRecallReports(newCri);
    }, [loadRecallReports]);

    const handlePageChange = useCallback((newCri) => {
        setSearchCriteria(newCri);
        loadRecallReports(newCri);
    }, [loadRecallReports]);

    const handleRowClick = (id) => {
        navigate(`/recall_detail/${id}`);
    };

    const handleDownloadCsv = async () => {
        try {
            await downloadRecallCsv();
            alert("CSV 파일 다운로드를 시작합니다.");
        } catch (err) {
            console.error("CSV 다운로드 실패:", err);
            alert("CSV 파일 다운로드에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleDownloadExcel = async () => {
        try {
            await downloadRecallExcel();
            alert("엑셀 파일 다운로드를 시작합니다.");
        } catch (err) {
            console.error("엑셀 다운로드 실패:", err);
            alert("엑셀 파일 다운로드에 실패했습니다. 다시 시도해주세요.");
        }
    };
	

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>리콜 정보를 불러오는 중입니다...</div>;
    if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>오류: {error}</div>;

    return (
        <main id="main">

            {/* Starter Section Section */}
            <section id="starter-section" className="starter-section section">
                <div className="container" data-aos="fade-up">
                    <div className="section-title text-center">
                        <h2 className="title">리콜 내역</h2>
                    </div>

                    <div className="widgets-container">
                        {/* 검색 컴포넌트 추가 */}
                        <RecallListSearch
                            searchCriteria={searchCriteria}
                            onSearchChange={handleSearchChange}
                            onSearchSubmit={handleSearchSubmit}
                        />

                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <table className="table-custom">
                                <thead>
                                    <tr>
                                        <th>리콜 ID</th>
                                        <th>제품명</th>
                                        <th>제조사</th>
                                        <th>제조기간</th>
                                        <th>기타정보</th>
                                        <th>모델명</th>
                                        <th>리콜유형</th>
                                        <th>연락처</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recallList.length > 0 ? (
                                        recallList.map(item => (
                                            <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                                                <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.id}</td>
                                                <td style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.product_name}</td>
                                                <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.manufacturer}</td>
                                                <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.manufacturing_period}</td> 
                                                <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.additional_info}</td>
                                                <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.model_name}</td>
                                                <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.recall_type}</td>
                                                <td style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.contact_info}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>리콜 내역이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='center-group-container'>
                        <button
                            id="downloadCsvBtn"
                            className='round-button'
                            onClick={handleDownloadCsv}
                        >
                            CSV 전체 다운로드
                        </button>
                        <button
                            id="excelDownloadBtn"
                            onClick={handleDownloadExcel}
                            className='round-button'
                        >
                            엑셀 전체 다운로드
                        </button>
                    </div>

                    {/* Pagination 컴포넌트 재사용 */}
                    <Pagination pageMaker={pageMaker} onPageChange={handlePageChange} />

                </div>
            </section>
        </main>
    );
}

export default RecallList;