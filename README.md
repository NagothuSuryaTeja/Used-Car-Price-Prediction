# 🚗 CarValue — Used Car Price Prediction

> An end-to-end Machine Learning web application that predicts the **market resale value** of a used car using an XGBoost regression model, served through a Flask REST API and a modern React frontend.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Machine Learning Pipeline](#machine-learning-pipeline)
   - [Dataset](#dataset)
   - [Exploratory Data Analysis](#exploratory-data-analysis)
   - [Data Preprocessing](#data-preprocessing)
   - [Model Training](#model-training)
   - [Model Artifacts](#model-artifacts)
5. [Backend — Flask API](#backend--flask-api)
   - [Setup & Installation](#setup--installation)
   - [API Endpoints](#api-endpoints)
   - [Running the Server](#running-the-server)
6. [Frontend — React App](#frontend--react-app)
   - [Setup & Installation](#setup--installation-1)
   - [Pages & Routing](#pages--routing)
   - [Design System](#design-system)
   - [Running the Dev Server](#running-the-dev-server)
7. [How to Run the Full App](#how-to-run-the-full-app)
8. [Input Features Reference](#input-features-reference)
9. [API Reference](#api-reference)
10. [Screenshots](#screenshots)

---

## Project Overview

**CarValue** is a full-stack AI application that allows users to get an instant price estimate for a used car by entering its specifications. The prediction is powered by an **XGBoost Regressor** trained on the **CarDekho dataset** (~15,000 listings), achieving high accuracy by analyzing 10 key vehicle features.

### Key Features
- 🤖 **AI Prediction** — XGBoost model with preprocessing pipeline
- ⚡ **Instant Results** — Predictions returned in under 1 second
- 🎨 **Premium UI** — Dark-themed glassmorphism React frontend
- 🔗 **REST API** — Flask backend with CORS support
- 📱 **Responsive** — Works across desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| **ML Model** | XGBoost Regressor |
| **Data Processing** | Pandas, NumPy, Scikit-learn |
| **Visualization** | Matplotlib, Seaborn, Plotly |
| **Backend** | Python 3, Flask, Flask-CORS |
| **Frontend** | React 18, Vite, React Router DOM |
| **Styling** | Vanilla CSS (Dark theme + Glassmorphism) |
| **Fonts** | Google Fonts — Inter |

---

## Project Structure

```
New folder/
│
├── Used Car Prediction/          # Backend + ML
│   ├── app.py                    # Flask REST API
│   ├── requirements.txt          # Python dependencies
│   │
│   ├── data/
│   │   └── cardekho_imputated.csv    # Cleaned dataset (15,411 rows)
│   │
│   ├── models/                       # Trained model artifacts
│   │   ├── Xgboost_Regressor_model.pkl
│   │   ├── preprocessor.pkl
│   │   └── LabelEncoder.pkl
│   │
│   ├── notebooks/
│   │   └── used_car_prediction.ipynb # Full ML pipeline notebook
│   │
│   └── utils/
│       ├── __init__.py
│       └── utils.py              # Prediction helper function
│
└── Frontend/                     # React Frontend
    ├── index.html                # HTML entry point with SEO meta tags
    ├── package.json
    ├── vite.config.js
    │
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Router configuration
        ├── index.css             # Global design system & CSS tokens
        ├── App.css
        │
        ├── api/
        │   └── predict.js        # Fetch wrapper for /predict endpoint
        │
        ├── components/
        │   ├── Navbar.jsx        # Fixed navigation bar
        │   ├── Navbar.css
        │   ├── Footer.jsx        # Footer with links
        │   └── Footer.css
        │
        └── pages/
            ├── LandingPage.jsx   # Hero + Features + How It Works + CTA
            ├── LandingPage.css
            ├── PredictionPage.jsx # Car details form (10 inputs)
            ├── PredictionPage.css
            ├── ResultPage.jsx    # Animated price result display
            └── ResultPage.css
```

---

## Machine Learning Pipeline

### Dataset

- **Source**: CarDekho dataset (`cardekho_imputated.csv`)
- **Size**: 15,411 rows × 13 columns (after cleaning)
- **Target Variable**: `selling_price` (in Indian Rupees ₹)

**Sample Data:**

| car_name | model | vehicle_age | km_driven | fuel_type | transmission | mileage | engine | max_power | seats | selling_price |
|---|---|---|---|---|---|---|---|---|---|---|
| Maruti Alto | Alto | 9 | 120,000 | Petrol | Manual | 19.70 | 796 | 46.30 | 5 | ₹1,20,000 |
| Hyundai i20 | i20 | 11 | 60,000 | Petrol | Manual | 17.00 | 1,197 | 80.00 | 5 | ₹2,15,000 |
| Ford Ecosport | Ecosport | 6 | 30,000 | Diesel | Manual | 22.77 | 1,498 | 98.59 | 5 | ₹5,70,000 |
| Honda City | City | 2 | 13,000 | Petrol | Automatic | 18.00 | 1,497 | 117.60 | 5 | ₹12,00,000 |

### Exploratory Data Analysis

Performed in `notebooks/used_car_prediction.ipynb`:

- **Missing Values**: Dataset was already imputed — 0 nulls across all columns.
- **Duplicates**: Identified and handled 167 duplicate rows.
- **Feature Inspection**: Examined all 13 columns; dropped `car_name` and `brand` as `model` already captures car identity.
- **Distributions**: Analyzed selling price distribution, mileage vs price, engine vs price correlations.
- **Categorical Inspection**: `seller_type` (Individual, Dealer, Trustmark Dealer), `fuel_type` (Petrol, Diesel, CNG, LPG, Electric), `transmission_type` (Manual, Automatic).

### Data Preprocessing

The preprocessing pipeline (saved as `preprocessor.pkl`) handles:

1. **Label Encoding** — `model` column encoded with `LabelEncoder` (saved as `LabelEncoder.pkl`)
2. **Categorical Encoding** — `seller_type`, `fuel_type`, `transmission_type` one-hot or ordinal encoded via `ColumnTransformer`
3. **Numerical Features** — `vehicle_age`, `km_driven`, `mileage`, `engine`, `max_power`, `seats` passed through the pipeline

**Features used for training (10 total):**

| Feature | Type | Description |
|---|---|---|
| `model` | Categorical | Car model name (e.g., i20, Swift) |
| `vehicle_age` | Numerical | Age of vehicle in years |
| `km_driven` | Numerical | Total kilometers driven |
| `seller_type` | Categorical | Individual / Dealer / Trustmark Dealer |
| `fuel_type` | Categorical | Petrol / Diesel / CNG / LPG / Electric |
| `transmission_type` | Categorical | Manual / Automatic |
| `mileage` | Numerical | Fuel efficiency in km/l |
| `engine` | Numerical | Engine displacement in CC |
| `max_power` | Numerical | Maximum power output in bhp |
| `seats` | Numerical | Number of seats |

### Model Training

- **Algorithm**: XGBoost Regressor (`xgboost` library)
- **Split**: Train/test split applied on the 15K+ dataset
- **Pipeline**: Preprocessing → Label Encoding → XGBoost Prediction
- **Target**: `selling_price` (continuous, in ₹)

### Model Artifacts

All trained artifacts are stored in `Used Car Prediction/models/`:

| File | Description |
|---|---|
| `Xgboost_Regressor_model.pkl` | Trained XGBoost model (~730 KB) |
| `preprocessor.pkl` | Scikit-learn ColumnTransformer pipeline |
| `LabelEncoder.pkl` | LabelEncoder fitted on car model names |

---

## Backend — Flask API

### Setup & Installation

**Prerequisites**: Python 3.8+, `pip`

```bash
# Navigate to the backend folder
cd "Used Car Prediction"

# (Recommended) Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

**`requirements.txt`:**
```
ipykernel
pandas
numpy
scikit-learn
matplotlib
seaborn
plotly
xgboost
flask
flask-cors
```

### API Endpoints

#### `GET /`
Returns a welcome message confirming the API is running.

**Response:**
```
Welcome To The Used Car Prediction API
```

---

#### `POST /predict`
Accepts car feature data and returns a predicted selling price.

**Request Body (JSON):**
```json
{
  "model": "i20",
  "vehicle_age": 5,
  "km_driven": 60000,
  "seller_type": "Individual",
  "fuel_type": "Petrol",
  "transmission_type": "Manual",
  "mileage": 17.0,
  "engine": 1197,
  "max_power": 80.0,
  "seats": 5
}
```

**Success Response (200):**
```json
{
  "predicted_price": 645000,
  "status": "success"
}
```

**Error Response (400/500):**
```json
{
  "error": "Missing field: fuel_type",
  "status": "error"
}
```

### Running the Server

```bash
# From inside "Used Car Prediction/" directory
python app.py
```

The server starts at: **`http://127.0.0.1:5000`**

> ⚠️ **Note**: This is a Flask development server. Do not use in production. Use Gunicorn or uWSGI for deployment.

**How `utils/utils.py` works:**

```python
def prediction(items):
    C = pd.DataFrame(items)
    # Load artifacts
    preprocessor = pickle.load(open('./models/preprocessor.pkl', 'rb'))
    model        = pickle.load(open('./models/Xgboost_Regressor_model.pkl', 'rb'))
    encoder      = pickle.load(open('./models/LabelEncoder.pkl', 'rb'))
    # Transform and predict
    C['model'] = encoder.transform(C['model'])
    C = preprocessor.transform(C)
    pred = model.predict(C)
    return int(pred[0])
```

---

## Frontend — React App

### Setup & Installation

**Prerequisites**: Node.js 18+, npm

```bash
# Navigate to the frontend folder
cd Frontend

# Install dependencies
npm install
```

**Key Dependencies:**
```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^7.x",
  "vite": "^8.x"
}
```

### Pages & Routing

The app uses **React Router DOM** with three routes:

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage.jsx` | Marketing landing page |
| `/predict` | `PredictionPage.jsx` | Car details input form |
| `/result` | `ResultPage.jsx` | Animated price result display |

#### 🏠 Landing Page (`/`)

Sections:
- **Navbar** — Fixed glassmorphism navigation with logo and CTA
- **Hero** — Headline, subtext, CTA buttons, stats bar (15K+ analyzed, 94% accuracy, <1s response), animated mock price card
- **Features** — 4-card grid (Instant Results, High Accuracy, No Sign-up, 10+ Features)
- **How It Works** — 3-step process (Enter Details → AI Analyzes → Get Estimate)
- **CTA Banner** — Call-to-action with glow effect
- **Footer** — Brand info, navigation links, model info

#### 📋 Prediction Form (`/predict`)

- Organized into two sections: *Car Identification* and *Vehicle Specifications*
- All 10 model features as form controls (dropdowns + number inputs)
- Client-side validation with inline error messages
- Loading spinner during API call
- Error banner for API/network failures
- On success → navigates to `/result` passing price + car details via router state

#### 🎯 Result Page (`/result`)

- Redirects to `/predict` if accessed directly without data
- **Animated price count-up** — smooth cubic ease-out animation from ₹0 to the predicted value
- **Market range bar** — Visual indicator showing ±10% typical price range
- **Car details grid** — All 10 submitted features displayed with emoji icons
- **Action buttons** — "Predict Another Car" and "Back to Home"
- **Disclaimer** note about estimate accuracy

### Design System

Defined in `src/index.css`:

```css
:root {
  --bg-primary:        #050812;          /* Deep dark background */
  --bg-secondary:      #0d1224;          /* Card backgrounds */
  --accent-violet:     #6c63ff;          /* Primary accent */
  --accent-cyan:       #00d4ff;          /* Secondary accent */
  --accent-gradient:   linear-gradient(135deg, #6c63ff, #00d4ff);
  --text-primary:      #f0f2ff;
  --text-secondary:    #a0aec0;
  --radius-lg:         24px;
  --transition:        all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Design Elements:**
- **Glassmorphism cards** — `backdrop-filter: blur(20px)` with subtle borders
- **Floating orbs** — Animated radial gradient blobs in background
- **Micro-animations** — `fadeInUp`, `scaleIn`, `float`, `pulse`
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts
- **Custom scrollbar** — Violet-accented thin scrollbar

### Running the Dev Server

```bash
cd Frontend
npm run dev
```

Opens at: **`http://localhost:5173`**

---

## How to Run the Full App

Run **both** services simultaneously in separate terminals:

### Terminal 1 — Flask Backend

```bash
cd "Used Car Prediction"
venv\Scripts\activate
python app.py
# → Running on http://127.0.0.1:5000
```

### Terminal 2 — React Frontend

```bash
cd Frontend
npm run dev
# → Running on http://localhost:5173
```

Then open **http://localhost:5173** in your browser.

> The frontend is pre-configured to call `http://localhost:5000/predict`. Make sure the Flask server is running before submitting the form.

**Full User Flow:**

```
Landing Page (/)
    ↓  Click "Estimate My Car's Price"
Prediction Form (/predict)
    ↓  Fill in 10 fields + click "Predict Price"
    ↓  POST http://localhost:5000/predict
    ↓  Flask → loads .pkl → XGBoost → returns price
Result Page (/result)
    ↓  Animated count-up of predicted price
    ↓  Car details grid + market range bar
```

---

## Input Features Reference

| Feature | Type | Valid Values | Example |
|---|---|---|---|
| `model` | string | Any car model name | `"i20"` |
| `vehicle_age` | integer | 0–30 (years) | `5` |
| `km_driven` | integer | ≥ 0 | `60000` |
| `seller_type` | string | `"Individual"`, `"Dealer"`, `"Trustmark Dealer"` | `"Individual"` |
| `fuel_type` | string | `"Petrol"`, `"Diesel"`, `"CNG"`, `"LPG"`, `"Electric"` | `"Petrol"` |
| `transmission_type` | string | `"Manual"`, `"Automatic"` | `"Manual"` |
| `mileage` | float | > 0 (km/l) | `17.0` |
| `engine` | integer | > 0 (CC) | `1197` |
| `max_power` | float | > 0 (bhp) | `80.0` |
| `seats` | integer | 2, 4, 5, 6, 7, 8, 9, 10 | `5` |

---

## API Reference

### `POST /predict`

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "model": "i20",
    "vehicle_age": 5,
    "km_driven": 60000,
    "seller_type": "Individual",
    "fuel_type": "Petrol",
    "transmission_type": "Manual",
    "mileage": 17.0,
    "engine": 1197,
    "max_power": 80.0,
    "seats": 5
  }'
```

**Response:**
```json
{
  "predicted_price": 645000,
  "status": "success"
}
```

---

## Screenshots

### Landing Page
The hero section features an animated stats bar, a live preview card showing a sample prediction, and a clear call-to-action.

### Prediction Form
Two-section form (Car Identification + Vehicle Specifications) with validation, placeholders, and a prominent "Predict Price" button.

### Result Page
Animated count-up price in large gradient text, a visual market range bar (±10%), and a full breakdown of the analyzed car features.

---

> Built with ❤️ using Python, Flask, XGBoost, React, and Vite.
