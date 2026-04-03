// src/pages/PredictionPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictCarPrice } from '../api/predict';
import './PredictionPage.css';

const CAR_MODELS = [
  'Alto', 'WagonR', 'Swift', 'Dzire', 'Baleno', 'Brezza', 'Ertiga',
  'i10', 'i20', 'Venue', 'Creta', 'Verna', 'Aura',
  'Tiago', 'Nexon', 'Harrier', 'Safari', 'Altroz',
  'Polo', 'Vento', 'Taigun',
  'City', 'Amaze', 'WR-V', 'Jazz',
  'Duster', 'Kwid', 'Triber', 'Kiger',
  'Figo', 'EcoSport', 'Freestyle', 'Aspire',
  'Scorpio', 'Bolero', 'XUV300', 'XUV500', 'XUV700',
  'Compass', 'Meridian',
  'Seltos', 'Sonet', 'Carnival',
];

const SELLER_TYPES = ['Individual', 'Dealer', 'Trustmark Dealer'];
const FUEL_TYPES   = ['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric'];
const TRANS_TYPES  = ['Manual', 'Automatic'];
const SEAT_OPTIONS = [2, 4, 5, 6, 7, 8, 9, 10];

const initialForm = {
  model: '',
  vehicle_age: '',
  km_driven: '',
  seller_type: '',
  fuel_type: '',
  transmission_type: '',
  mileage: '',
  engine: '',
  max_power: '',
  seats: '',
};

export default function PredictionPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    setApiError('');
  }

  function validate() {
    const newErrors = {};
    if (!form.model)             newErrors.model = 'Please select a car model.';
    if (!form.vehicle_age || isNaN(form.vehicle_age) || Number(form.vehicle_age) < 0)
                                 newErrors.vehicle_age = 'Enter a valid vehicle age.';
    if (!form.km_driven || isNaN(form.km_driven) || Number(form.km_driven) < 0)
                                 newErrors.km_driven = 'Enter valid kilometers driven.';
    if (!form.seller_type)       newErrors.seller_type = 'Please select seller type.';
    if (!form.fuel_type)         newErrors.fuel_type = 'Please select fuel type.';
    if (!form.transmission_type) newErrors.transmission_type = 'Please select transmission.';
    if (!form.mileage || isNaN(form.mileage) || Number(form.mileage) <= 0)
                                 newErrors.mileage = 'Enter valid mileage.';
    if (!form.engine || isNaN(form.engine) || Number(form.engine) <= 0)
                                 newErrors.engine = 'Enter valid engine CC.';
    if (!form.max_power || isNaN(form.max_power) || Number(form.max_power) <= 0)
                                 newErrors.max_power = 'Enter valid max power.';
    if (!form.seats)             newErrors.seats = 'Please select number of seats.';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const payload = {
        model:             form.model,
        vehicle_age:       Number(form.vehicle_age),
        km_driven:         Number(form.km_driven),
        seller_type:       form.seller_type,
        fuel_type:         form.fuel_type,
        transmission_type: form.transmission_type,
        mileage:           parseFloat(form.mileage),
        engine:            parseInt(form.engine),
        max_power:         parseFloat(form.max_power),
        seats:             parseInt(form.seats),
      };
      const data = await predictCarPrice(payload);
      navigate('/result', { state: { price: data.predicted_price, carDetails: payload } });
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please check the backend server.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper predict-page">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <div className="container predict-container">
        {/* Header */}
        <div className="predict-header animate-fade-up">
          <span className="section-tag">AI Prediction</span>
          <h1 className="predict-title">
            Get Your Car's <span className="gradient-text">Price Estimate</span>
          </h1>
          <p className="predict-subtitle">
            Fill in the details below. Our model will analyze 10 features and
            predict the market value of your used car.
          </p>
        </div>

        {/* Form Card */}
        <form className="predict-form glass-card animate-fade-up-delay-1" onSubmit={handleSubmit} noValidate>
          <div className="form-section-title">🚗 Car Identification</div>
          <div className="form-grid">
            {/* Car Model */}
            <div className="form-group">
              <label className="form-label" htmlFor="model">Car Model *</label>
              <div className="select-wrapper">
                <select id="model" name="model" className="form-select" value={form.model} onChange={handleChange}>
                  <option value="">Select model</option>
                  {CAR_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {errors.model && <span className="form-error">{errors.model}</span>}
            </div>

            {/* Seller Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="seller_type">Seller Type *</label>
              <div className="select-wrapper">
                <select id="seller_type" name="seller_type" className="form-select" value={form.seller_type} onChange={handleChange}>
                  <option value="">Select seller type</option>
                  {SELLER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {errors.seller_type && <span className="form-error">{errors.seller_type}</span>}
            </div>
          </div>

          <div className="form-section-title" style={{ marginTop: '28px' }}>⚙️ Vehicle Specifications</div>
          <div className="form-grid">
            {/* Vehicle Age */}
            <div className="form-group">
              <label className="form-label" htmlFor="vehicle_age">Vehicle Age (years) *</label>
              <input id="vehicle_age" name="vehicle_age" type="number" min="0" max="30"
                className="form-input" placeholder="e.g. 5"
                value={form.vehicle_age} onChange={handleChange} />
              {errors.vehicle_age && <span className="form-error">{errors.vehicle_age}</span>}
            </div>

            {/* KM Driven */}
            <div className="form-group">
              <label className="form-label" htmlFor="km_driven">Kilometers Driven *</label>
              <input id="km_driven" name="km_driven" type="number" min="0"
                className="form-input" placeholder="e.g. 60000"
                value={form.km_driven} onChange={handleChange} />
              {errors.km_driven && <span className="form-error">{errors.km_driven}</span>}
            </div>

            {/* Fuel Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="fuel_type">Fuel Type *</label>
              <div className="select-wrapper">
                <select id="fuel_type" name="fuel_type" className="form-select" value={form.fuel_type} onChange={handleChange}>
                  <option value="">Select fuel type</option>
                  {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              {errors.fuel_type && <span className="form-error">{errors.fuel_type}</span>}
            </div>

            {/* Transmission */}
            <div className="form-group">
              <label className="form-label" htmlFor="transmission_type">Transmission *</label>
              <div className="select-wrapper">
                <select id="transmission_type" name="transmission_type" className="form-select" value={form.transmission_type} onChange={handleChange}>
                  <option value="">Select transmission</option>
                  {TRANS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              {errors.transmission_type && <span className="form-error">{errors.transmission_type}</span>}
            </div>

            {/* Mileage */}
            <div className="form-group">
              <label className="form-label" htmlFor="mileage">Mileage (km/l) *</label>
              <input id="mileage" name="mileage" type="number" step="0.01" min="0"
                className="form-input" placeholder="e.g. 17.5"
                value={form.mileage} onChange={handleChange} />
              {errors.mileage && <span className="form-error">{errors.mileage}</span>}
            </div>

            {/* Engine */}
            <div className="form-group">
              <label className="form-label" htmlFor="engine">Engine Capacity (CC) *</label>
              <input id="engine" name="engine" type="number" min="0"
                className="form-input" placeholder="e.g. 1197"
                value={form.engine} onChange={handleChange} />
              {errors.engine && <span className="form-error">{errors.engine}</span>}
            </div>

            {/* Max Power */}
            <div className="form-group">
              <label className="form-label" htmlFor="max_power">Max Power (bhp) *</label>
              <input id="max_power" name="max_power" type="number" step="0.01" min="0"
                className="form-input" placeholder="e.g. 80.0"
                value={form.max_power} onChange={handleChange} />
              {errors.max_power && <span className="form-error">{errors.max_power}</span>}
            </div>

            {/* Seats */}
            <div className="form-group">
              <label className="form-label" htmlFor="seats">Number of Seats *</label>
              <div className="select-wrapper">
                <select id="seats" name="seats" className="form-select" value={form.seats} onChange={handleChange}>
                  <option value="">Select seats</option>
                  {SEAT_OPTIONS.map(s => <option key={s} value={s}>{s} Seats</option>)}
                </select>
              </div>
              {errors.seats && <span className="form-error">{errors.seats}</span>}
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="api-error-box">
              <span>⚠️</span> {apiError}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn-primary submit-btn" id="predict-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing Your Car...
              </>
            ) : (
              <>
                Predict Price
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
