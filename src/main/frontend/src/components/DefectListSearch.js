// src/components/DefectListSearch.js

const DefectListSearch = ({ searchCriteria, onSearchChange, onSearchSubmit }) => (
  
  <form onSubmit={onSearchSubmit} className="uk-form-stacked" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>

      <select
        name="type"
        className="uk-select uk-form-width-small"
        value={searchCriteria.type}
        onChange={onSearchChange}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">전체</option>
        <option value="T">모델명</option>
        <option value="C">신고 유형</option>
        <option value="W">신고자</option>
      </select>

      <input
        type="text"
        name="keyword"
        className="uk-input uk-form-width-medium"
        placeholder="키워드 입력"
        value={searchCriteria.keyword}
        style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        onChange={onSearchChange}
      />

      <span>신고일</span>
      <input
        type="date"
        name="reportDate"
        className="uk-input uk-form-width-small"
        value={searchCriteria.reportDate}
        onChange={onSearchChange}
      />

      <button type="submit" className="button uk-button-primary">검색</button>
  </form>
);

export default DefectListSearch;