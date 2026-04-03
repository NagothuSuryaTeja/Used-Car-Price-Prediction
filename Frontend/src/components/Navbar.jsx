// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M5 10l-.5-2H19.5L19 10M5 10H3l1 7h16l1-7H5zm0 0h14M9 17v-4m6 4v-4" stroke="url(#grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6c63ff"/>
                  <stop offset="100%" stopColor="#00d4ff"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">
            Car<span className="gradient-text">Value</span>
          </span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/predict" className={`nav-link ${location.pathname === '/predict' ? 'active' : ''}`}>
            Estimate Price
          </Link>
        </div>

        <Link to="/predict" className="btn-primary nav-cta" id="nav-cta-btn">
          Get Free Estimate
        </Link>
      </div>
    </nav>
  );
}
