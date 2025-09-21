import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">Portail SCPI</Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/admin/dashboard">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;