// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FloatingButton from './components/FloatingButton'; // 플로팅 버튼 
import ChatbotPopup from './components/ChatbotPopup'; // 챗봇 팝업 

import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import AnnouncePage from './pages/AnnouncePage'; 
import AnnounceViewPage from './pages/AnnounceViewPage';
import FaqPage from './pages/FaqPage';
import FaqWritePage from './pages/FaqWritePage';
import AnnounceWritePage from './pages/AnnounceWritePage';
import ReportDefectPage from './pages/ReportDefectPage';
import DefectReportListPage from './pages/DefectReportList';
import DefectDetail from './pages/DefectDetail';
import DefectPasswordCheck from './pages/DefectPasswordCheck';
import DefectModify from './pages/DefectModify';
import RecallList from './pages/RecallList';
import RecallDetail from './pages/RecallDetail';
import DefectDetailsCheckPage from './pages/DefectDetailsCheckPage';
import RecallStaticsYearPage from './pages/RecallStaticsYearPage';
import RecallStaticsMonthPage from './pages/RecallStaticsMonthPage';
import RecallCount from './pages/RecallCountPage';
import LoginPage from './pages/LoginPage';
import JwtTestPage from './pages/JwtTestPage';
import { fetchTestData } from './services/api';
import './styles/App.css';
import './styles/main.css';

function PdfDownloadPage() {
  // 쿼리스트링에서 startYear, endYear 추출
  const params = new URLSearchParams(window.location.search);
  const startYear = params.get('startYear') || '';
  const endYear = params.get('endYear') || '';
  //  const pdfUrl = `http://localhost:8485/pdf/recall_statics_summaryList?startYear=${startYear}&endYear=${endYear}`;
 const pdfUrl = `https://recall-final-backend.onrender.com/api/pdf/recall_statics_summaryList?startYear=${startYear}&endYear=${endYear}`;
  useEffect(() => {
    window.open(pdfUrl, '_blank');
  }, [pdfUrl]);
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>PDF 다운로드가 새 창에서 시작됩니다.</h2>
      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">직접 다운로드</a>
    </div>
  );
}

function App() {
  const [backendData, setBackendData] = useState(null);
  
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // 챗봇 
  const handleChatbotToggle = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadTestData = async () => {
      const data = await fetchTestData();
      setBackendData(data);
    };

    loadTestData();
  }, []);

  return (
    <Router>
      <>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/announce" element={<AnnouncePage />} />
            <Route path="/announce_view/:id" element={<AnnounceViewPage />} />
            <Route path="/notice" element={<FaqPage />} />
            <Route path="/notice_write" element={<FaqWritePage />} />
            <Route path="/announce_write" element={<AnnounceWritePage />} />
            <Route path="/defect_reports" element={<ReportDefectPage />} />
            <Route path="/defect_list" element={<DefectReportListPage />} />
            <Route path="/defect_detail/:id" element={<DefectDetail />} />
            <Route path="/defect_pwcheck/:id" element={<DefectPasswordCheck />} />
            <Route path="/defect_modify/:id" element={<DefectModify />} />
            <Route path="/recall_list" element={<RecallList />} />
            <Route path="/recall_detail/:id" element={<RecallDetail />} />
            <Route path="/defect_details_check" element={<DefectDetailsCheckPage />} />
            <Route path="/recall_statics_year" element={<RecallStaticsYearPage />} />
            <Route path="/recall_statics_Month" element={<RecallStaticsMonthPage />} />
            <Route path="/recall_statics_year/pdf" element={<PdfDownloadPage />} />
            <Route path="/RecallCountPage" element={<RecallCount />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/jwt-test" element={<JwtTestPage />} />
          </Routes>
        </MainLayout>

        <FloatingButton type="top" style={{ bottom: '80px' }} /> {/* 맨 위로 버튼 */}
        <FloatingButton
          type="chatbot"
          onClick={handleChatbotToggle}
        />
        <ChatbotPopup
          isOpen={isChatbotOpen}
          onClose={handleChatbotToggle}
        />
      </>
    </Router>
  );
}

export default App;
