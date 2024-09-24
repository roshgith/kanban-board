import React, { useState } from 'react';
import './Header.css';
import DisplayIcon from './icons_FEtask/Display.svg';
import ArrowIcon from './icons_FEtask/down.svg';

const Header = ({ groupBy, sortBy, onGroupChange, onSortChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGroupChange = (e) => {
    const selectedGroup = e.target.value;
    onGroupChange(selectedGroup);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    onSortChange(selectedSort);
  };

  return (
    <div className="header-container">
      <div className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <img src={DisplayIcon} alt="Display" className="display-icon" />
          <span style={{ marginLeft: '8px' }}>Display</span>
          <img src={ArrowIcon} alt="Arrow" className="arrow-icon" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-section">
              <label>Grouping</label>
              <select onChange={handleGroupChange} value={groupBy}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Ordering</label>
              <select onChange={handleSortChange} value={sortBy}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
