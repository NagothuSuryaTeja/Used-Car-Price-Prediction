// src/api/predict.js

const API_BASE_URL = 'http://localhost:5000';

export async function predictCarPrice(carData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Prediction failed. Please try again.');
  }

  return response.json();
}
