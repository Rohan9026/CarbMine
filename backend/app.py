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


# Defining standard constants for exploring Carbon Footprint Neutralization Pathways
# Reference:
'''-----Carbon Footprint Reduction from EVs: EVs typically reduce carbon emissions by 20%-30% compared to conventional vehicles (IEA, "Global EV Outlook," 2023).
Link: https://www.iea.org/reports/global-ev-outlook-2023-----'''
'''-----Carbon Footprint Reduction from Cleaner Fuels: Switching from coal to natural gas can reduce carbon emissions by about 50% (EPA, "Greenhouse Gas Emissions from a Typical Passenger Vehicle," 2023).
Link: https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle-----'''
'''-----Afforestation Sequestration Rate: Afforestation sequesters approximately 2.2 tons of carbon per hectare per year (IPCC, "Special Report on Climate Change and Land," 2019).
Link: https://www.ipcc.ch/srccl/-----'''
'''-----Renewable Energy Reduction: Renewable energy can reduce electricity consumption and carbon emissions by up to 30% (IRENA, "Renewable Energy and Jobs – Annual Review," 2022).
Link: https://www.irena.org/publications/2022/Dec/Renewable-Energy-and-Jobs-Annual-Review-2022-----'''

EV_CONSTANT = 0.20
GREEN_FUEL_CONSTANT = 0.50
SEQUESTRATION_RATE = 2.2
ELECTRICITY_REDUCTION_RATE = 0.3 

@app.route('/neutralise', methods=['POST'])
def calculate_neutralisation_pathways():
    data = request.json
    emissions = float(data['emissions'])
    transportation = float(data['transportation'])
    fuel = float(data['fuel'])

    transportation_reduction = transportation * EV_CONSTANT
    fuel_reduction = fuel * GREEN_FUEL_CONSTANT
    remaining_emissions = emissions - (transportation_reduction + fuel_reduction)

    land_required = remaining_emissions / SEQUESTRATION_RATE
    electricity_consumption = emissions * ELECTRICITY_REDUCTION_RATE 

    result = {
        'transportation_footprint_reduction': transportation_reduction,
        'fuel_footprint_reduction': fuel_reduction,
        'remaining_footprint_after_reduction': remaining_emissions,
        'land_required_for_afforestation_hectares': land_required,
        'estimated_electricity_savings_mwh': electricity_consumption,
        'message': 'Carbon footprint neutralization pathways calculated successfully.'
    }
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
