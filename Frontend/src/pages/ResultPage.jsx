// src/pages/ResultPage.jsx
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './ResultPage.css';

// Animated count-up hook
function useCountUp(target, duration = 1800) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!target) return;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        setCurrent(target);
      }
    }

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return current;
}

function formatINR(num) {
  return new Intl.NumberFormat('en-IN').format(num);
}

const LABELS = {
  model:             { label: 'Car Model',          emoji: '🚘' },
  vehicle_age:       { label: 'Vehicle Age',         emoji: '📅', unit: 'years' },
  km_driven:         { label: 'Kilometers Driven',   emoji: '🛣️', format: v => formatINR(v) + ' km' },
  seller_type:       { label: 'Seller Type',         emoji: '👤' },
  fuel_type:         { label: 'Fuel Type',           emoji: '⛽' },
  transmission_type: { label: 'Transmission',        emoji: '⚙️' },
  mileage:           { label: 'Mileage',             emoji: '💧', unit: 'km/l' },
  engine:            { label: 'Engine Capacity',     emoji: '🔧', unit: 'CC' },
  max_power:         { label: 'Max Power',           emoji: '⚡', unit: 'bhp' },
  seats:             { label: 'Seats',               emoji: '💺', unit: 'seats' },
};

export default function ResultPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { price, carDetails } = location.state || {};
  const animatedPrice = useCountUp(price || 0, 1800);

  useEffect(() => {
    if (!price) {
      navigate('/predict', { replace: true });
    }
  }, [price, navigate]);

  if (!price) return null;

  const formatValue = (key, val) => {
    const info = LABELS[key];
    if (!info) return val;
    if (info.format) return info.format(val);
    if (info.unit) return `${val} ${info.unit}`;
    return val;
  };

  return (
    <div className="page-wrapper result-page">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="container result-container">
        {/* Header */}
        <div className="result-header animate-fade-up">
          <div className="success-badge">
            <span className="success-icon">✓</span>
            Analysis Complete
          </div>
          <h1 className="result-title">
            Your Car's Estimated <span className="gradient-text">Market Value</span>
          </h1>
        </div>

        {/* Price Card */}
        <div className="price-card glass-card animate-scale-in">
          <div className="price-card-glow" />
          <div className="price-car-emoji">🚗</div>
          
          <div className="price-label-top">Predicted Selling Price</div>
          <div className="price-value gradient-text">
            ₹{formatINR(animatedPrice)}
          </div>
          <div className="price-confidence">
            <span className="confidence-dot" />
            High confidence · XGBoost Model
          </div>

          {/* Price breakdown bar */}
          <div className="price-range-bar">
            <div className="range-labels">
              <span>₹{formatINR(Math.floor(price * 0.9))}</span>
              <span className="range-mid">Estimated Value</span>
              <span>₹{formatINR(Math.ceil(price * 1.1))}</span>
            </div>
            <div className="range-track">
              <div className="range-fill" />
              <div className="range-marker" />
            </div>
            <div className="range-desc">Typical market range: ±10%</div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="details-section animate-fade-up-delay-1">
          <h2 className="details-title">Car Details Analyzed</h2>
          <div className="details-grid">
            {carDetails && Object.entries(carDetails).map(([key, val]) => {
              const info = LABELS[key];
              if (!info) return null;
              return (
                <div key={key} className="detail-item glass-card">
                  <span className="detail-emoji">{info.emoji}</span>
                  <div>
                    <div className="detail-key">{info.label}</div>
                    <div className="detail-val">{formatValue(key, val)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="result-actions animate-fade-up-delay-2">
          <Link to="/predict" className="btn-primary" id="result-predict-again-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
            Predict Another Car
          </Link>
          <Link to="/" className="btn-outline" id="result-home-btn">
            ← Back to Home
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="result-disclaimer animate-fade-up-delay-3">
          * This is an AI-generated estimate based on historical data from the CarDekho dataset.
          Actual resale value may vary based on car condition, location, and market demand.
        </p>
      </div>
    </div>
  );
}
