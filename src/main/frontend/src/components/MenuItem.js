// components/MenuItem.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.css';

const MenuItem = ({ item, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    if (item.children) setIsDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    if (item.children) setIsDropdownOpen(false);
  };
const getDropdownMenuStyle = () => {
    const style = {
      position: 'absolute',
      backgroundColor: '#444', // 드롭다운 메뉴 배경색
      minWidth: '160px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1, // 다른 콘텐츠 위에 표시되도록
      listStyle: 'none',
      padding: '10px 0',
      margin: 0,
      borderRadius: '5px',
      top: 'calc(100% + 5px)', // 부모 li 아래에 위치
      left: '0', // 기본적으로 왼쪽에 붙여서 시작 (L-R)
    };

    if (item.label === "관리자") { 
      style.left = 'unset'; // left 속성 제거
      style.right = '-10px'; // 오른쪽 끝에 정렬 
    }

    return style;
  };
  // 메뉴 클릭 시 onNavigate 호출(모바일 메뉴 닫기)
  const handleClick = (e) => {
    if (onNavigate) onNavigate();
  };

  return (
    <li
      className={`nav-item${item.children ? ' dropdown' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={item.link || '#'} className={item.children ? 'dropdown-toggle' : ''} onClick={handleClick}>
        <span>{item.label}</span>
        {item.children && <i className="bi toggle-dropdown"></i>}
      </Link>
      {item.children && isDropdownOpen && (
        <ul
          className="dropdown-menu"
          style={getDropdownMenuStyle()} // 👈 인라인 스타일 적용
        >
          {item.children.map((child, idx) => (
            <li key={idx} style={{ padding: '0' }}>
              <Link to={child.link} onClick={handleClick} style={{ display: 'block', padding: '8px 15px', color: 'white', textDecoration: 'none' }}>
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