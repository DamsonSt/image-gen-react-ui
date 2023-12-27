import React from 'react';
import './Header.scss';

const HeaderLogo = () => (
  <div className="logo">
    <span className="logoIcon">I</span>
    <span className="logoText">Image Generation</span>
    
  </div>
);

const Header = () => (
  <header className="header">
    <HeaderLogo />
    {/* ... other header content ... */}
  </header>
);

export default Header;