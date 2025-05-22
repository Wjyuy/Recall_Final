// services/faqService.js
import axios from 'axios';


// const API_BASE_URL = 'http://localhost:8485/api'; // Spring Boot API 주소에 맞춰 변경
// const API_BASE_URL = 'https://recall-final-backend.onrender.com/api';
// const API_BASE_URL = window.location.hostname == 'localhost' ? 'http://localhost:8485/api' : 'https://recall-final-backend.onrender.com/api';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchFaqs = async (params) => {
  try {
    // 예시: /api/faqs?pageNum=1&amount=10&type=T&keyword=자동차
    const response = await axios.get(`${API_BASE_URL}/faqs`, { params });
    return response.data; // 서버에서 받은 데이터 (list와 pageMaker 정보 포함)
  } catch (error) {
    console.error('FAQ 데이터를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};