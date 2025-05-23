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
        marginTop: '5px',    // 부모 메뉴 아이템과의 간격
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
        top: 'calc(100% + 5px)', // 부모 li 아래에 위치
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
    // 자식 메뉴가 있는 경우에만 드롭다운 토글 로직 적용
    if (item.children) {
      // ⭐️ 모바일 메뉴가 열려있을 때만 기본 Link 동작 방지 및 드롭다운 토글
      if (isMobileMenuOpen) {
        e.preventDefault(); // 중요: Link의 페이지 이동 기본 동작 방지
        setIsDropdownOpen((prev) => !prev); // 드롭다운 열림/닫힘 상태 토글
      }
      // 데스크탑에서는 hover로 열리므로, 클릭 시에는 Link가 작동하도록 허용
      // (만약 데스크탑에서도 클릭으로 토글하고 싶다면 else if (item.children) e.preventDefault(); setIsDropdownOpen... 로직을 추가)
    }

    // 메뉴 클릭 시 상위 컴포넌트의 onNavigate 호출 (예: 모바일 메뉴 닫기)
    // 드롭다운 토글과 별개로 항상 호출되도록 여기에 유지
    if (onNavigate) {
      // 드롭다운이 열렸거나 닫힐 때만 onNavigate를 호출 (선택 사항)
      // 현재는 Link가 동작하는 경우에도 호출됨
      // if (!item.children || (item.children && !isDropdownOpen)) { // 드롭다운이 없는 메뉴이거나, 드롭다운이 닫히는 경우
      //   onNavigate();
      // }
      // 여기서는 드롭다운 메뉴 항목 클릭 시 전체 모바일 메뉴가 닫히도록 하는 것이 일반적이므로,
      // 최종 자식 메뉴 아이템 클릭 시에만 onNavigate를 호출하는 것이 좋습니다.
      // 그렇지 않으면 드롭다운을 열 때마다 모바일 메뉴가 닫힐 수 있습니다.
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
            style={{ marginLeft: '5px', fontSize: '0.8em', float: 'right' }}
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