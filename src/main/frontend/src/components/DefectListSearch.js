// src/components/DefectListSearch.js

const DefectListSearch = ({ searchCriteria, onSearchChange, onSearchSubmit }) => (
  <form
    onSubmit={onSearchSubmit}
    style={{
      marginBottom: '20px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <select
      name="type"
      className="uk-select uk-form-width-small"
      value={searchCriteria.type}
      onChange={onSearchChange}
      style={{
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        minWidth: 120,
        flexShrink: 0,
        ...(window.innerWidth <= 600 ? { width: '100%' } : {})
      }}
    >
      <option value="">전체</option>
      <option value="T">모델명</option>
      <option value="C">신고 유형</option>
      <option value="W">신고자</option>
    </select>

    <input
      type="text"
      value={searchCriteria.keyword}
      onChange={onSearchChange}
      className="uk-input uk-form-width-medium"
      name="keyword"
      placeholder="키워드를 입력하세요"
      style={{
        flexGrow: 1,
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        ...(window.innerWidth <= 600 ? { width: '100%' } : {})
      }}
    />

    <input
      type="date"
      name="reportDate"
      className="uk-input uk-form-width-small"
      value={searchCriteria.reportDate}
      onChange={onSearchChange}
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

export default DefectListSearch;