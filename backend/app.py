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
    # Individual per capita emissions
    excavation_per_capita = excavation_emissions / workers
    transportation_per_capita = transportation_emissions / workers
    equipment_per_capita = equipment_emissions / workers

    # Individual per output emissions
    excavation_per_output = excavation_emissions / output
    transportation_per_output = transportation_emissions / output
    equipment_per_output = equipment_emissions / output


    return jsonify({
        'totalEmissions': total_emissions,
        'excavationEmissions': excavation_emissions,
        'transportationEmissions': transportation_emissions,
        'equipmentEmissions': equipment_emissions,
        'excavationPerCapita': excavation_per_capita,
        'transportationPerCapita': transportation_per_capita,
        'equipmentPerCapita': equipment_per_capita,
        'excavationPerOutput': excavation_per_output,
        'transportationPerOutput': transportation_per_output,
        'equipmentPerOutput': equipment_per_output,
        'perCapitaEmissions': total_emissions / workers,
        'perOutputEmissions': total_emissions / output
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
    
    # Get the user-specified percentages
    green_fuel_percentage = float(data['green_fuel_percentage']) / 100
    neutralise_percentage = float(data['neutralise_percentage']) / 100
    ev_transportation_percentage = float(data['ev_transportaion_percentage']) / 100

    #Calculate Emissions to be neutralised
    emissions_to_be_neutralised = emissions*neutralise_percentage

    # Calculate reductions based on the user input percentages
    transportation_reduction = transportation * EV_CONSTANT * ev_transportation_percentage
    fuel_reduction = fuel * GREEN_FUEL_CONSTANT * green_fuel_percentage
    
    # Calculate the remaining emissions after applying reductions
    remaining_emissions = emissions_to_be_neutralised - (transportation_reduction + fuel_reduction)
    
    # Calculate the required land for afforestation and electricity savings
    land_required = remaining_emissions / SEQUESTRATION_RATE
    electricity_consumption = emissions_to_be_neutralised * ELECTRICITY_REDUCTION_RATE
    
    overall_remaining_emissions = emissions - emissions_to_be_neutralised

    result = {
        'emissions': emissions,
        'emissions_to_be_neutralised': emissions_to_be_neutralised,
        'transportation_footprint_reduction': transportation_reduction,
        'fuel_footprint_reduction': fuel_reduction,
        'remaining_footprint_after_reduction': remaining_emissions,
        'land_required_for_afforestation_hectares': land_required,
        'estimated_electricity_savings_mwh': electricity_consumption,
        'overall_remianing_footprint': overall_remaining_emissions,
        'message': 'Carbon footprint neutralization pathways calculated successfully.'
    }
    
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
