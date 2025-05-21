// src/services/StaticrecallApiService.js
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8485/api';
const API_BASE_URL = 'https://recall-final-backend.onrender.com/api';
// const API_BASE_URL = window.location.hostname == 'localhost' ? 'http://localhost:8485/api' : 'https://recall-final-backend.onrender.com/api';

/**
 * 연도별 리콜 통계 조회
 * @param {Object} params { startYear, endYear }
 * @returns {Promise<Object>} 통계 데이터 (summary, summaryList, groupedRecallStats 등)
 */
export const fetchRecallStaticsYear = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recall_statics_year`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recall statics year:', error);
    throw error;
  }
};

/**
 * (옵션) 제조사별 리콜 통계 조회 등 추가 함수 필요시 여기에 작성
 */
// export const fetchRecallStaticsByMaker = async (params = {}) => { ... }

export default {
  fetchRecallStaticsYear,
};
