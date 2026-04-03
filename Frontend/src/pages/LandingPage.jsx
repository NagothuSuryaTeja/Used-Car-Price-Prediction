// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import './LandingPage.css';

const features = [
  {
    icon: '⚡',
    title: 'Instant Results',
    desc: 'Get your car\'s estimated market value in under a second using our AI model.',
  },
  {
    icon: '🎯',
    title: 'High Accuracy',
    desc: 'Trained on the CarDekho dataset with XGBoost — one of the most powerful ML algorithms.',
  },
  {
    icon: '🔒',
    title: 'No Sign-up Required',
    desc: 'Simply enter your car details and get the prediction. No account, no hassle.',
  },
  {
    icon: '📊',
    title: '10+ Features Analyzed',
    desc: 'Our model considers fuel type, mileage, engine, transmission, age, and more.',
  },
];

const steps = [
  { num: '01', title: 'Enter Car Details', desc: 'Fill in your car\'s model, age, fuel type, engine specs and more.' },
  { num: '02', title: 'AI Analyzes Data', desc: 'Our XGBoost model processes 10 features through a trained pipeline.' },
  { num: '03', title: 'Get Your Estimate', desc: 'Receive an instant, data-driven market price estimate.' },
];

const stats = [
  { value: '15K+', label: 'Cars Analyzed' },
  { value: '94%', label: 'Model Accuracy' },
  { value: '<1s', label: 'Response Time' },
  { value: '10', label: 'Features Used' },
];

export default function LandingPage() {
  return (
    <div className="page-wrapper">
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-badge animate-fade-up">
            <span className="badge-dot" />
            AI-Powered · XGBoost Model · CarDekho Dataset
          </div>

          <h1 className="hero-title animate-fade-up-delay-1">
            Know Your Car's<br />
            True <span className="gradient-text">Market Value</span>
          </h1>

          <p className="hero-subtitle animate-fade-up-delay-2">
            Stop guessing. Our machine learning model analyzes your car's specifications
            and gives you an accurate price estimate — instantly and for free.
          </p>

          <div className="hero-actions animate-fade-up-delay-3">
            <Link to="/predict" className="btn-primary" id="hero-cta-btn">
              Estimate My Car's Price
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href="#how-it-works" className="btn-outline" id="hero-learn-btn">
              See How It Works
            </a>
          </div>

          {/* Stats bar */}
          <div className="stats-bar animate-fade-up-delay-3">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-value gradient-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual-wrapper animate-fade-up-delay-2">
          <div className="hero-card glass-card">
            <div className="hero-card-header">
              <div className="card-dots">
                <span /><span /><span />
              </div>
              <span className="card-title-mini">Price Estimate</span>
            </div>
            <div className="hero-car-icon">🚗</div>
            <div className="hero-price-display">
              <span className="price-label">Estimated Value</span>
              <span className="price-amount gradient-text">₹6,45,000</span>
              <span className="price-sub">Based on 10 features</span>
            </div>
            <div className="hero-card-specs">
              {[
                { k: 'Model', v: 'i20' },
                { k: 'Age', v: '5 years' },
                { k: 'Fuel', v: 'Petrol' },
                { k: 'km', v: '60,000' },
              ].map(({ k, v }) => (
                <div key={k} className="spec-row">
                  <span className="spec-key">{k}</span>
                  <span className="spec-val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why CarValue</span>
            <h2 className="section-title">Built for Smart Sellers & Buyers</h2>
            <p className="section-subtitle">
              Powered by machine learning, we make car pricing transparent and accessible.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Three simple steps to get your car's market price.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={step.num} className="step-card">
                <div className="step-connector">
                  {i < steps.length - 1 && <div className="step-line" />}
                </div>
                <div className="step-num gradient-text">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-glow" />
            <h2 className="cta-title">Ready to Find Out Your Car's Worth?</h2>
            <p className="cta-desc">
              It takes less than 2 minutes. No sign-up, no fees, no strings attached.
            </p>
            <Link to="/predict" className="btn-primary cta-btn" id="cta-section-btn">
              Start Free Estimate
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
