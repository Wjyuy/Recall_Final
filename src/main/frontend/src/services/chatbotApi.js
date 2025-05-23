// src/services/chatbotApi.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const askChatbot = async (question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/askchatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      // HTTP 오류 상태 코드 처리
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.text(); // 응답이 순수 텍스트이므로 .text() 사용
    return data;
  } catch (error) {
    console.error('챗봇 API 호출 중 오류 발생:', error);
    // 사용자에게 보여줄 에러 메시지를 반환하거나 처리
    return '죄송합니다. 챗봇과 연결하는 중 오류가 발생했습니다.';
  }
};