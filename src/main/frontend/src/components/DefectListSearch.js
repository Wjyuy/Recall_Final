// src/components/DefectListSearch.js

const DefectListSearch = ({ searchCriteria, onSearchChange, onSearchSubmit }) => (
  <form
    onSubmit={onSearchSubmit}
    className="recall-search-form"
  >
    <select
      name="type"
      value={searchCriteria.type}
      onChange={onSearchChange}
      className="search-type-select"
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
      name="keyword"
      placeholder="키워드를 입력하세요"
      className="search-keyword-input"
    />

    <input
      type="date"
      name="reportDate"
      className="search-keyword-input"
      value={searchCriteria.reportDate}
      onChange={onSearchChange}
    />

    <button
      type="submit"
      className="search-button"
    >
      검색
    </button>

  </form>
);

export default DefectListSearch;