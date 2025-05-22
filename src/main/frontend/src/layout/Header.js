// layout/Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem'; // MenuItem 컴포넌트 import

// 메뉴 데이터를 배열로 정의 (더 관리하기 쉬움)
const menuItems = [
  { label: '리콜정보', link: '/recall_list' },
  {
    label: '결함신고',
    link: '/defect_reports',
    children: [
      { label: '결함신고', link: '/defect_reports' },
      { label: '신고내역조회', link: '/defect_list' },
    ],
  },
  {
    label: '리콜센터',
    link: '/announce',
    children: [
      { label: '공지사항', link: '/announce' },
      { label: 'FAQ', link: '/notice' },
    ],
  },
  { label: '리콜통계', link: '/recall_statics_year' },
  {
    label: '관리자',
    link: '/jwt-test',
    children: [
      { label: '리콜정보검수', link: '/defect_details_check' },
      { label: '공지사항작성', link: '/announce_write' },
      { label: '관리자로그인', link: '/login' },
    ],
  },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 모바일 메뉴 토글
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // 모바일 메뉴에서 메뉴 클릭 시 메뉴 닫기
  const handleMobileNavigate = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    function handleResize() {
      const btn = document.getElementById('mobileMenuBtn');
      if (!btn) return;
      if (window.innerWidth <= 991) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); // mount 시 1회
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{ backgroundColor: '#333', color: 'white', padding: '10px', display: 'flex', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0 , color: 'white'}}>Recall center</h1>
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav id="navmenu" className="navmenu" style={{ marginLeft: 'auto', display: mobileMenuOpen ? 'none' : 'block' }}>
        <ul style={{ display: 'flex', gap: 0, margin: 0, padding: 0, listStyle: 'none' }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
        {/* 모바일 메뉴 토글 버튼 - 화면이 축소(991px 이하)일 때만 보이게 */}
        <i
          className="mobile-nav-toggle d-xl-none bi bi-list"
          style={{
            fontSize: 28,
            marginLeft: 16,
            cursor: 'pointer',
            display: 'none', // 기본은 숨김
            position: 'absolute',
            right: 20,
            top: 10,
            zIndex: 2100,
          }}
          onClick={handleMobileMenuToggle}
          id="mobileMenuBtn"
        ></i>
      </nav>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <nav
          className="mobile-nav"
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            width: '100%',
            background: '#222',
            zIndex: 2000,
            padding: '20px 0',
          }}
        >
          {/* 닫기 버튼: 햄버거와 동일한 위치(우측 상단) */}
          <button
            style={{
              position: 'absolute',
              top: 10,
              right: 20,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28, // 햄버거와 동일
              cursor: 'pointer',
              zIndex: 2100,
              marginLeft: 16,
            }}
            aria-label="모바일 메뉴 닫기"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="bi bi-x"></i>
          </button>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} onNavigate={() => setMobileMenuOpen(false)} />
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;