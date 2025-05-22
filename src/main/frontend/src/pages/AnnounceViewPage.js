// pages/AnnounceViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchAnnouncementDetail } from '../services/announceService';
import { formatDateTime } from '../utils/formatters';

function AnnounceViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [announce, setAnnounce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnnounceDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAnnouncementDetail(id); // 이제 data에 prevId, nextId도 포함
        setAnnounce(data);
      } catch (err) {
        setError('공지사항 상세 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAnnounceDetail();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate('/announce');
  };

  // 백엔드에서 받은 prevId로 이동
  const handlePrevArticle = () => {
    if (announce && announce.prevId) {
      navigate(`/announce_view/${announce.prevId}`); // prevId로 라우팅
    }
  };

  // 백엔드에서 받은 nextId로 이동
  const handleNextArticle = () => {
    if (announce && announce.nextId) {
      navigate(`/announce_view/${announce.nextId}`); // nextId로 라우팅
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>공지사항 상세 정보를 불러오는 중입니다...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>오류: {error}</div>;
  if (!announce) return <div style={{ textAlign: 'center', padding: '20px' }}>해당 공지사항을 찾을 수 없습니다.</div>;

  // 버튼 활성화/비활성화 조건 (이제 prevId, nextId 존재 여부로 판단)
  const isPrevDisabled = !announce.prevId;
  const isNextDisabled = !announce.nextId;

  return (
    <section id="starter-section" className="starter-section section">
      <div className="container" data-aos="fade-up">
          <div className="section-title text-center">
              <h2 className="title">공지사항</h2>
          </div>

          <div className="announce-detail-page detail-widgets-container" style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2>{announce.title}</h2>
            <p style={{ color: '#666', fontSize: '0.9em' }}>작성일: {formatDateTime(announce.created_at)}</p>
            <hr style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />
            <div className="announce-content" dangerouslySetInnerHTML={{ __html: announce.content }} style={{ lineHeight: '1.6' }}>
            </div>
            <hr style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />

            </div>
            <div className="download-btn-group">
                <button
                  onClick={handlePrevArticle}
                  disabled={isPrevDisabled}
                  className='uk-button uk-button-default'
                  style={{ marginRight: '12px' }}
                >
                  이전글
                </button>
                
                <button
                  onClick={handleNextArticle}
                  disabled={isNextDisabled}
                  className='uk-button uk-button-default'
                >
                  다음글
                </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleGoBack}
                style={{
                  backgroundColor: '#6c757d',
                }}
              >
                목록으로 돌아가기
              </button>
          </div>
        </div>
    </section>
  );
}

export default AnnounceViewPage;