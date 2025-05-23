// layout/Header.js
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem'; // MenuItem 컴포넌트 import

// 메뉴 데이터를 배열로 정의 (더 관리하기 쉬움)
const menuItems = [
  { label: '리콜정보', link: '/recall_list' },
  {
    label: '결함신고',
    link: '/defect_list',
    children: [
      { label: '신고내역조회', link: '/defect_list' },
      { label: '결함신고하기', link: '/defect_reports' },
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
  {
    label: '리콜통계',
    link: '/recall_statics_year',
    children: [
      { label: '연도별', link: '/recall_statics_year' },
      { label: '월별', link: '/recall_statics_Month' },
      { label: '중복모델', link: '/RecallCountPage' },
    ],
  },
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
  const [headerHeight, setHeaderHeight] = useState(50); // 기본값 55
  const headerRef = useRef(null);

  // 모바일 메뉴 토글
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // 모바일 메뉴에서 메뉴 클릭 시 메뉴 닫기
  const handleMobileNavigate = () => {
    setMobileMenuOpen(false);
  };

  useLayoutEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <header ref={headerRef} style={{ backgroundColor: '#333', color: 'white', padding: '10px', display: 'flex', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ margin: 0 , color: 'white'}}>Recall center</h1>
      </Link>

      {/* 데스크탑 메뉴 */}
      <nav id="navmenu" className="navmenu" style={{ marginLeft: 'auto', display: mobileMenuOpen ? 'none' : undefined, position: 'relative' }}>
        <ul style={{ paddingRight: 30, display: 'flex', gap: 0, margin: 0, padding: 0, listStyle: 'none' }}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
        {/* 모바일 메뉴 토글 버튼 - CSS 미디어 쿼리로 제어, position: fixed로 헤더 우측 상단에 고정 */}
        <i
          className="mobile-nav-toggle d-xl-none bi bi-list"
          style={{
            fontSize: 28,
            marginLeft: 16,
            cursor: 'pointer',
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
            top: 0, // headerHeight → 0 (헤더와 바로 붙게)
            left: 0,
            width: '100%',
            background: '#222',
            zIndex: 2000,
            padding: '0 0 20px 0',
          }}
        >
          {/* 닫기 버튼: 햄버거와 동일한 위치(우측 상단) */}
          <button
            style={{
              position: 'absolute',
              top: 5,
              right: 15,
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: 28, 
              cursor: 'pointer',
              zIndex: 2100,
              marginLeft: 16,
            }}
            aria-label="모바일 메뉴 닫기"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="bi bi-x"></i>
          </button>
            <div style={{ backgroundColor: '#333', color: 'white', padding: '10px', display: 'flex', alignItems: 'center',  top: 0, left: 0, width: '100%'}}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1 style={{ margin: 0 , color: 'white'}}>Recall center</h1>
            </Link>
            </div>
            
          <ul style={{ listStyle: 'none', margin: 10, padding: 0 }}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} onNavigate={() => setMobileMenuOpen(false)} />
            ))}
          </ul>
        </nav>
      )}
      {/* 반응형 햄버거/네비게이션 CSS */}
      <style>{`
        @media (max-width: 1199px) {
          .navmenu > ul { display: none !important; }
          .mobile-nav-toggle { display: block !important; position: fixed !important; right: 20px !important; top: 10px !important; }
        }
        @media (min-width: 1200px) {
          .navmenu > ul { display: flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}

export default Header;