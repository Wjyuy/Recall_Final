// components/AnnounceSearch.js
import { useState } from 'react';

const AnnounceSearch = ({ onSearch, initialType = '', initialKeyword = '' }) => {
  const [type, setType] = useState(initialType);
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, keyword, pageNum: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="search-form" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
      <select name="type" value={type} onChange={e => setType(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
        <option value="">전체</option>
        <option value="T">제목</option>
        <option value="C">내용</option>
      </select>
      <input
        type="text"
        name="keyword"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
        style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default AnnounceSearch;