from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.utils import prediction

app = Flask(__name__)
CORS(app)  # Allow all origins (React dev server)


@app.route('/')
def home():
    return "Welcome To The Used Car Prediction API"


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = [
            'model', 'vehicle_age', 'km_driven', 'seller_type',
            'fuel_type', 'transmission_type', 'mileage', 'engine',
            'max_power', 'seats'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        items = [{
            'model': str(data['model']),
            'vehicle_age': int(data['vehicle_age']),
            'km_driven': int(data['km_driven']),
            'seller_type': str(data['seller_type']),
            'fuel_type': str(data['fuel_type']),
            'transmission_type': str(data['transmission_type']),
            'mileage': float(data['mileage']),
            'engine': int(data['engine']),
            'max_power': float(data['max_power']),
            'seats': int(data['seats'])
        }]

        predicted_price = prediction(items)
        return jsonify({'predicted_price': predicted_price, 'status': 'success'})

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)