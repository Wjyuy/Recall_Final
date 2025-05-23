// components/MenuItem.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({ item, onNavigate, isMobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 마우스 오버/리브 시 드롭다운 토글 (모바일 메뉴가 아닐 때만 작동)
  const handleMouseEnter = () => {
    if (item.children && !isMobileMenuOpen) {
      setIsDropdownOpen(true);
    }
  };
  const handleMouseLeave = () => {
    if (item.children && !isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  // 드롭다운 메뉴의 스타일을 동적으로 결정
  const getDropdownMenuStyle = () => {
    const baseStyle = {
      listStyle: 'none',
      padding: '10px 0',
      margin: 0,
      borderRadius: '5px',
      zIndex: 1,
    };

    // ⭐️ 모바일 메뉴가 열려있을 때의 스타일
    if (isMobileMenuOpen) {
      return {
        ...baseStyle,
        position: 'static', // 문서 흐름에 따라 배치
        width: '100%',     // 전체 너비
        backgroundColor: '#555', // 모바일 드롭다운 배경색
        boxShadow: 'none', // 그림자 제거
        borderRadius: '0', // 둥근 모서리 제거
        paddingLeft: '20px', // 들여쓰기 효과
       
        // marginTop: 'px',    // 부모 메뉴 아이템과의 간격
      };
    }
    // ⭐️ 데스크탑 메뉴일 때의 스타일
    else {
      let desktopStyle = {
        ...baseStyle,
        position: 'absolute',
        backgroundColor: '#444',
        minWidth: '160px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        top: 'calc(100%)', // 부모 li 아래에 위치
        left: '0', // 기본적으로 왼쪽에서 시작
      };

      // "관리자" 메뉴일 경우 오른쪽 정렬
      if (item.label === "관리자") {
        desktopStyle.left = 'unset';
        desktopStyle.right = '-10px'; // 오른쪽으로 더 붙이기
      }
      return desktopStyle;
    }
  };

  // 메뉴 클릭 시 동작 정의
const handleClick = (e) => {
    if (item.children) {
      // 자식 메뉴가 있는 경우 (모바일에서만 토글)
      if (isMobileMenuOpen) {
        e.preventDefault(); // 중요: Link의 페이지 이동 기본 동작 방지
        setIsDropdownOpen((prev) => !prev); // 드롭다운 열림/닫힘 상태 토글
      }
    } else {
      // ⭐️ 자식 메뉴가 없는 경우 (일반 메뉴 아이템)
      // 모바일 메뉴가 열려있다면 onNavigate 호출 (메뉴 닫기)
      if (isMobileMenuOpen) {
        onNavigate(); // onNavigate 함수를 호출하여 모바일 메뉴를 닫습니다.
      }
      // 데스크탑에서는 Link의 기본 동작에 맡김
    }
  };
  return (
    <li
      className={`nav-item${item.children ? ' dropdown' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // 모바일 메뉴에서 li의 너비를 100%로 설정 (선택 사항)
      style={{ position: 'relative', width: isMobileMenuOpen ? '100%' : 'auto' }}
    >
      <Link
        to={item.link || '#'}
        // ⭐️ Link 컴포넌트의 onClick에 handleClick 연결
        onClick={handleClick}
        style={{
          display: 'block',
          // padding: '10px 15px',
          color: 'white',
          textDecoration: 'none',
          // 모바일 메뉴일 때 배경색 변경 (자식 메뉴가 있는 경우)
          backgroundColor: isMobileMenuOpen && item.children ? '#4a4a4a' : 'transparent',
          borderBottom: isMobileMenuOpen ? '1px solid #555' : 'none', // 모바일 메뉴 항목 구분선
        }}
      >
        <span>{item.label}</span>
        {item.children && (
          <i
            className={`bi ${isDropdownOpen && isMobileMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}
            style={{ marginLeft: '5px', fontSize: '0.8em', float: 'right' ,marginTop: '5px'}}
          ></i>
        )}
      </Link>
      {item.children && isDropdownOpen && (
        <ul className="dropdown-menu" style={getDropdownMenuStyle()}>
          {item.children.map((child, idx) => (
            <li key={idx} style={{ padding: '0' }}>
              <Link
                to={child.link}
                // ⭐️ 하위 메뉴 항목 클릭 시에도 onNavigate 호출 (모바일 메뉴 닫기)
                onClick={onNavigate} // 직접 onNavigate 호출
                style={{
                  display: 'block',
                  padding: '8px 15px',
                  color: 'white',
                  textDecoration: 'none',
                  borderBottom: isMobileMenuOpen ? '1px solid #666' : 'none', // 모바일 드롭다운 항목 구분선
                }}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;