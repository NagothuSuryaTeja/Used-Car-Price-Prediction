// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Car<span className="gradient-text">Value</span>
          </Link>
          <p className="footer-tagline">
            AI-powered used car price predictions.<br />
            Accurate. Instant. Free.
          </p>
        </div>

        <div className="footer-links-group">
          <span className="footer-group-title">Navigate</span>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/predict" className="footer-link">Get Estimate</Link>
        </div>

        <div className="footer-links-group">
          <span className="footer-group-title">Model Info</span>
          <span className="footer-link">XGBoost Regressor</span>
          <span className="footer-link">CarDekho Dataset</span>
          <span className="footer-link">10 Features</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} CarValue · Used Car Price Prediction</p>
        </div>
      </div>
    </footer>
  );
}
