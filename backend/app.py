from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

EXCAVATION_FACTOR = 0.1  # Example emission factor for excavation
TRANSPORTATION_FACTOR = 2.5  # Example emission factor for transportation
EQUIPMENT_FACTOR = 3.2  # Example emission factor for equipment usage

@app.route('/calculate', methods=['POST'])
def calculate_emissions():
    data = request.json
    
    excavation = float(data['excavation'])
    transportation = float(data['transportation'])
    fuel = float(data['fuel'])
    equipment = float(data['equipment'])
    workers = int(data['workers'])
    output = float(data['output'])

    # Emission calculations
    excavation_emissions = excavation * EXCAVATION_FACTOR
    transportation_emissions = transportation * TRANSPORTATION_FACTOR * fuel
    equipment_emissions = equipment * EQUIPMENT_FACTOR

    total_emissions = excavation_emissions + transportation_emissions + equipment_emissions
    per_capita_emissions = total_emissions / workers
    per_output_emissions = total_emissions / output

    return jsonify({
        'totalEmissions': total_emissions,
        'perCapitaEmissions': per_capita_emissions,
        'perOutputEmissions': per_output_emissions
    })

if __name__ == '__main__':
    app.run(debug=True)
