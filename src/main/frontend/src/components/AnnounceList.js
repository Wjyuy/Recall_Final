// components/AnnounceList.js
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../utils/formatters';

const AnnounceList = ({ announcements = [], total = 0 }) => {
  const navigate = useNavigate();

  if (!announcements.length) {
    return <p>표시할 공지사항이 없습니다.</p>;
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
    <table className="table-custom">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성시간</th>
        </tr>
      </thead>
      <tbody>
        {announcements.length > 0 ? ( // 👈 데이터가 있는지 확인
  announcements.map(({ id, title, created_at }) => (
    <tr key={id} onClick={() => navigate(`/announce_view/${id}?total=${total}`)} style={{ cursor: 'pointer' }}>
      <td style={{
        maxWidth: 80, // 👈 최대 너비 설정
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {id}
      </td>
      <td style={{
        maxWidth: 300, // 👈 최대 너비 설정
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {title}
      </td>
      <td style={{
        maxWidth: 150, // 👈 최대 너비 설정
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}>
        {formatDateTime(created_at)}
      </td>
    </tr>
  ))
) : (
  // 👈 데이터가 없을 경우
  <tr>
    <td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>
      공지사항 내역이 없습니다.
    </td>
  </tr>
)}
      </tbody>
    </table>
    </div>
  );
};

export default AnnounceList;