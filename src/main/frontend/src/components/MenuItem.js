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
        <ul className="dropdown-menu">
          {item.children.map((child, idx) => (
            <li key={idx}>
              <Link to={child.link} onClick={handleClick}>{child.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;