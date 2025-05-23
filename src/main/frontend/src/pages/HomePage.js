// pages/HomePage.js
import React from 'react';
import useCounter from '../hooks/useCounter';
import './HomePage.css';

function HomePage() {
  const { count, increment, decrement } = useCounter();

  return (
    <main id="main">
    
      <section id="starter-section" className="starter-section section" >
        <div className="container" data-aos="fade-up">
          <div className="section-title text-center">
            <h2 className="title">RECALL-CENTER</h2>
          </div>

          <div className="widgets-container detail-widgets-container" >
            <section class="main-features">
              <h3>주요 서비스</h3>
              <div class="card-grid">
                  <a href="/recall_list" class="feature-card">
                      <i class="icon bi-car-front"></i> <h4>리콜 정보</h4>
                      <p>최신 차량 리콜 정보를 확인하세요.</p>
                  </a>
                  <a href="/recall_statics_year" class="feature-card">
                      <i class="icon bi-graph-up"></i> <h4>리콜 통계</h4>
                      <p>연도별, 월별 리콜 통계를 확인하세요.</p>
                  </a>
                  <a href="/defect_reports" class="feature-card">
                      <i class="icon bi-pencil-square"></i> <h4>결함 신고</h4>
                      <p>차량 결함 신고 및 내역을 조회합니다.</p>
                  </a>
                  <a href="/defect_list" class="feature-card">
                      <i class="icon bi-card-checklist"></i> <h4>신고 내역</h4>
                      <p>차량 결함 신고 및 내역을 조회합니다.</p>
                  </a>
                  <a href="/announce" class="feature-card">
                      <i class="icon bi-info-circle"></i> <h4>공지사항</h4>
                      <p>공지사항을 확인합니다.</p>
                  </a>
                  <a href="/notice" class="feature-card">
                      <i class="icon bi-info-circle"></i> <h4>FAQ</h4>
                      <p>FAQ를 확인합니다.</p>
                  </a>
                  <a href="/RecallCountPage" class="feature-card">
                      <i class="icon bi-stack-overflow"></i> <h4>중복모델</h4>
                      <p>연도별, 월별 리콜 통계를 확인하세요.</p>
                  </a>
                  <a href="/jwt-test" class="feature-card">
                      <i class="icon bi-person-gear"></i> <h4>관리자</h4>
                      <p>관리자 페이지입니다.</p>
                  </a>
              </div>
            </section>

          </div>
        </div>
      </section>

    </main>
  );
}

export default HomePage;