// src/services/StaticrecallApiService.js
import axios from 'axios';


// const API_BASE_URL = 'http://localhost:8485/api';
// const API_BASE_URL = 'https://recall-final-backend.onrender.com/api';
// const API_BASE_URL = window.location.hostname == 'localhost' ? 'http://localhost:8485/api' : 'https://recall-final-backend.onrender.com/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
 * 월별 리콜 통계 조회
 * @param {Object} params { startYear, endYear, startMonth, endMonth }
 * @returns {Promise<Object>} 통계 데이터 (summary, summaryList, groupedRecallStats 등)
 */
export const fetchRecallStaticsMonth = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recall_statics_month`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recall statics year:', error);
    throw error;
  }
};

/**
 * 반복 모델 조회
 * @param {Object} params 
 */
export const fetchRepeatedModels = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/repeatedModels`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recall count:', error);
    throw error;
  }
};

export default {
  fetchRecallStaticsYear,
};
