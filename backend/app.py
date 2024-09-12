from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Defining standard emission factors for emission estimation
# References
''' 2006 IPCC Guidelines for National Greenhouse Gas Inventories
    Link - https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_3_Ch3_Mobile_Combustion.pdf
           https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf '''
# Emission factors for coal mining activities (in kg CO2)
EXCAVATION_FACTOR = 94.6  # kg CO2 per ton of coal mined
TRANSPORTATION_FACTOR = 74.1  # kg CO2 per ton per km (for diesel-powered transportation)
FUEL_CONSUMPTION_FACTOR = 2.68  # kg CO2 per liter of diesel consumed
EQUIPMENT_FACTOR = 73.3  # kg CO2 per hour of equipment operation

GWP_METHANE = 25  # Global Warming Potential for Methane
COAL_CO2_EMISSION_FACTOR = 2.2  # Example value, tons CO2 per ton of coal
cost_per_cc = 42 #average cost per carbon credit is 42$ it may vary according to various conditions
emissionFactors = {
  'coal': 2.42,        # kg CO2 per kg of coal
  'oil': 3.17,         # kg CO2 per liter of oil
  'naturalGas': 2.75,  # kg CO2 per cubic meter of natural gas
  'biomass': 0         # kg CO2 per kg of biomass
};
@app.route('/calculate', methods=['POST'])
def calculate_emissions():
    data = request.json
    
    # Inputs
    excavation_tons = float(data['excavation'])  # Tons of coal mined
    transportation_km = float(data['transportation'])  # Distance in kilometers for transportation
    fuel_liters = float(data['fuel'])  # Fuel consumption in liters
    equipment_hours = float(data['equipment'])  # Hours of equipment operation
    workers = int(data['workers'])  # Number of workers
    output_tons = float(data['output'])  # Total output in tons of coal mined

    # Emission calculations based on activity and emission factors (CO2 in kg)
    excavation_emissions = excavation_tons * EXCAVATION_FACTOR  # kg CO2 from excavation
    transportation_emissions = excavation_tons * transportation_km * TRANSPORTATION_FACTOR  # kg CO2 from transportation
    fuel_emissions = fuel_liters * FUEL_CONSUMPTION_FACTOR  # kg CO2 from fuel consumption
    equipment_emissions = equipment_hours * EQUIPMENT_FACTOR  # kg CO2 from equipment usage

    # Total emissions in kg CO2
    total_emissions = excavation_emissions + transportation_emissions + fuel_emissions + equipment_emissions

    # Per capita (per worker) emissions
    excavation_per_capita = excavation_emissions / workers if workers > 0 else 0
    transportation_per_capita = transportation_emissions / workers if workers > 0 else 0
    equipment_per_capita = equipment_emissions / workers if workers > 0 else 0
    per_capita_emissions = total_emissions / workers if workers > 0 else 0

    # Per output emissions (e.g., per ton of coal mined)
    excavation_per_output = excavation_emissions / output_tons if output_tons > 0 else 0
    transportation_per_output = transportation_emissions / output_tons if output_tons > 0 else 0
    equipment_per_output = equipment_emissions / output_tons if output_tons > 0 else 0
    per_output_emissions = total_emissions / output_tons if output_tons > 0 else 0

    return jsonify({
        'totalEmissions': total_emissions,  # Total in kg CO2
        'excavationEmissions': excavation_emissions,  # kg CO2 for excavation
        'transportationEmissions': transportation_emissions,  # kg CO2 for transportation
        'equipmentEmissions': equipment_emissions,  # kg CO2 for equipment usage
        'excavationPerCapita': excavation_per_capita,  # kg CO2 per worker for excavation
        'transportationPerCapita': transportation_per_capita,  # kg CO2 per worker for transportation
        'equipmentPerCapita': equipment_per_capita,  # kg CO2 per worker for equipment
        'excavationPerOutput': excavation_per_output,  # kg CO2 per ton of coal mined
        'transportationPerOutput': transportation_per_output,  # kg CO2 per ton of coal mined
        'equipmentPerOutput': equipment_per_output,  # kg CO2 per ton of coal mined
        'perCapitaEmissions': per_capita_emissions,  # kg CO2 per worker
        'perOutputEmissions': per_output_emissions  # kg CO2 per ton of coal mined
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
