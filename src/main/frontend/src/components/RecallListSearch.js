// src/components/RecallListSearch.js
import { useState, useEffect } from 'react';

const RecallListSearch = ({ searchCriteria, onSearchSubmit, onSearchChange }) => {
  const [searchType, setSearchType] = useState(searchCriteria.type || '');
  const [searchKeyword, setSearchKeyword] = useState(searchCriteria.keyword || '');

  useEffect(() => {
    setSearchType(searchCriteria.type || '');
    setSearchKeyword(searchCriteria.keyword || '');
  }, [searchCriteria]);

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
    onSearchChange({ ...searchCriteria, type: e.target.value });
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
    onSearchChange({ ...searchCriteria, keyword: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit({ ...searchCriteria, type: searchType, keyword: searchKeyword, pageNum: 1 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <select
        value={searchType}
        onChange={handleTypeChange}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          minWidth: 120,
          flexShrink: 0,
          ...(window.innerWidth <= 600 ? { width: '100%' } : {})
        }}
      >
        <option value="">검색 유형 선택</option>
        <option value="product_name">제품명</option>
        <option value="manufacturer">제조사</option>
        <option value="model_name">모델명</option>
        <option value="recall_type">리콜유형</option>
        {/* 필요에 따라 다른 검색 유형 추가 */}
      </select>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleKeywordChange}
        placeholder="검색어를 입력하세요"
        style={{
          flexGrow: 1,
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          ...(window.innerWidth <= 600 ? { width: '100%' } : {})
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          background: '#00796b',
          color: '#fff',
          cursor: 'pointer',
          ...(window.innerWidth <= 600 ? { width: '100%' } : {})
        }}
      >
        검색
      </button>
      <style>{`
        @media (max-width: 600px) {
          form[role='search'], form[onsubmit] {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </form>
  );
};

export default RecallListSearch;