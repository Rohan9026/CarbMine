import React from 'react';

const EXCAVATION_FACTOR = 0.1;
const TRANSPORTATION_FACTOR = 2.5;
const EQUIPMENT_FACTOR = 3.2;
const EV_CONSTANT = 0.20;
const GREEN_FUEL_CONSTANT = 0.50;
const SEQUESTRATION_RATE = 2.2;
const ELECTRICITY_REDUCTION_RATE = 0.3;

const CalculationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300">
          <div className="bg-gradient-to-r from-blue-400 to-teal-300 text-white py-8">
            <h1 className="text-5xl font-bold text-center">CarbMine Project Calculations</h1>
            <p className="text-lg text-center mt-2 font-medium">
              An in-depth look at the calculations used in the CarbMine project, detailing emissions and neutralization pathways.
            </p>
          </div>

          <div className="p-10 space-y-10">
            {/* Section 1: Emission Calculations */}
            <section>
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 border-b-2 border-teal-400 pb-2">
                1. Emission Calculations
              </h2>
              <p className="text-base text-gray-700 mb-6">
                Emissions are calculated for various activities involved in operations, including excavation, transportation, fuel consumption, and equipment usage. Below are the formulas and explanations for each calculation.
              </p>
              
              <div className="space-y-8">
                {/* Excavation Emissions */}
                <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-green-800">Excavation Emissions</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">E = A × {EXCAVATION_FACTOR}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>E</strong>: Total excavation emissions (kg CO2).</li>
                      <li><strong>A</strong>: Amount of excavation material in tons.</li>
                      <li><strong>Excavation Factor</strong>: Emission factor for excavation ({EXCAVATION_FACTOR} kg CO2 per ton).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> This formula calculates the emissions generated during the excavation process by multiplying the amount of material excavated by a predefined emission factor. The `EXCAVATION_FACTOR` indicates the amount of CO2 produced per ton of material excavated.
                  </p>
                </div>

                {/* Transportation Emissions */}
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-yellow-800">Transportation Emissions</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">T = C × D × F</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>T</strong>: Total transportation emissions (kg CO2).</li>
                      <li><strong>C</strong>: Distance traveled (km).</li>
                      <li><strong>D</strong>: Emission factor for transportation ({TRANSPORTATION_FACTOR} kg CO2 per km).</li>
                      <li><strong>F</strong>: Fuel consumption factor.</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Transportation emissions are calculated by considering the distance traveled, the emission factor for transportation, and the amount of fuel consumed. The `TRANSPORTATION_FACTOR` represents the CO2 emitted per kilometer traveled.
                  </p>
                </div>

                {/* Fuel Consumption Emissions */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-blue-800">Fuel Consumption Emissions</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">F = E × {GREEN_FUEL_CONSTANT}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>F</strong>: Total fuel consumption emissions (kg CO2).</li>
                      <li><strong>E</strong>: Amount of fuel consumed (liters).</li>
                      <li><strong>Fuel Factor</strong>: Emission factor for fuel ({GREEN_FUEL_CONSTANT} kg CO2 per liter).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> This formula calculates the emissions resulting from fuel consumption. The `GREEN_FUEL_CONSTANT` reflects the CO2 emissions per liter of fuel consumed, which helps in understanding the carbon footprint associated with fuel usage.
                  </p>
                </div>

                {/* Equipment Usage Emissions */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-purple-800">Equipment Usage Emissions</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">G = H × {EQUIPMENT_FACTOR}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>G</strong>: Total equipment usage emissions (kg CO2).</li>
                      <li><strong>H</strong>: Number of hours equipment is used.</li>
                      <li><strong>Equipment Factor</strong>: Emission factor for equipment usage ({EQUIPMENT_FACTOR} kg CO2 per hour).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Equipment emissions are calculated based on the total hours the equipment is in use and its specific emission factor. The `EQUIPMENT_FACTOR` indicates the CO2 emissions per hour of equipment operation.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Total Emissions Calculation */}
            <section>
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 border-b-2 border-teal-400 pb-2">
                2. Total Emissions Calculation
              </h2>
              <p className="text-base text-gray-700 mb-6">
                The total emissions are computed by aggregating the emissions from excavation, transportation, fuel consumption, and equipment usage.
              </p>
              <div className="bg-gradient-to-r from-pink-50 to-pink-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <p className="text-base text-gray-800">
                  <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">Total Emissions = E + T + F + G</code>
                  <br />
                  <strong>Where:</strong>
                  <ul className="list-disc pl-6 mt-2">
                    <li><strong>E</strong>: Excavation emissions.</li>
                    <li><strong>T</strong>: Transportation emissions.</li>
                    <li><strong>F</strong>: Fuel consumption emissions.</li>
                    <li><strong>G</strong>: Equipment usage emissions.</li>
                  </ul>
                  <strong>Detailed Explanation:</strong> This formula consolidates all individual emission factors to present the total carbon footprint of the operational activities. By summing up the emissions from all sources, it provides an overview of the total environmental impact.
                </p>
              </div>
            </section>

            {/* Section 3: Neutralization Strategies */}
            <section>
              <h2 className="text-3xl font-semibold mb-4 text-gray-900 border-b-2 border-teal-400 pb-2">
                3. Neutralization Strategies
              </h2>
              <p className="text-base text-gray-700 mb-6">
                To mitigate the impact of emissions, various neutralization strategies are employed. These strategies aim to offset or reduce the overall carbon footprint.
              </p>
              
              <div className="space-y-8">
                {/* Electric Vehicles */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-teal-800">Electric Vehicles (EVs)</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">Neutralization from EVs = Total Emissions × {EV_CONSTANT}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>Neutralization from EVs</strong>: Reduction in emissions due to the use of electric vehicles.</li>
                      <li><strong>Total Emissions</strong>: The total emissions calculated.</li>
                      <li><strong>EV Constant</strong>: Reduction factor for EVs ({EV_CONSTANT}).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Using electric vehicles can significantly reduce emissions. The `EV_CONSTANT` represents the proportion of emissions offset by employing EVs compared to conventional vehicles.
                  </p>
                </div>

                {/* Green Fuels */}
                <div className="bg-gradient-to-r from-green-50 to-green-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-green-800">Green Fuels</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">Neutralization from Green Fuels = Total Emissions × {GREEN_FUEL_CONSTANT}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>Neutralization from Green Fuels</strong>: Reduction in emissions due to the use of green fuels.</li>
                      <li><strong>Total Emissions</strong>: The total emissions calculated.</li>
                      <li><strong>Green Fuel Constant</strong>: Reduction factor for green fuels ({GREEN_FUEL_CONSTANT}).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Green fuels contribute to reducing emissions by replacing conventional fuels. The `GREEN_FUEL_CONSTANT` indicates the proportion of emissions mitigated by using green fuels.
                  </p>
                </div>

                {/* Afforestation */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-amber-800">Afforestation</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">Neutralization from Afforestation = Total Emissions × {SEQUESTRATION_RATE}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>Neutralization from Afforestation</strong>: Reduction in emissions through afforestation efforts.</li>
                      <li><strong>Total Emissions</strong>: The total emissions calculated.</li>
                      <li><strong>Sequestration Rate</strong>: Carbon sequestration rate from afforestation ({SEQUESTRATION_RATE}).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Afforestation helps to absorb CO2 from the atmosphere. The `SEQUESTRATION_RATE` represents the amount of CO2 sequestered per unit area of forest.
                  </p>
                </div>

                {/* Renewable Energy */}
                <div className="bg-gradient-to-r from-teal-50 to-teal-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                  <h3 className="text-2xl font-semibold text-teal-800">Renewable Energy</h3>
                  <p className="text-base text-gray-800 mt-4">
                    <strong>Formula:</strong> <code className="bg-gray-100 p-1 rounded">Neutralization from Renewable Energy = Total Emissions × {ELECTRICITY_REDUCTION_RATE}</code>
                    <br />
                    <strong>Where:</strong>
                    <ul className="list-disc pl-6 mt-2">
                      <li><strong>Neutralization from Renewable Energy</strong>: Reduction in emissions through the use of renewable energy.</li>
                      <li><strong>Total Emissions</strong>: The total emissions calculated.</li>
                      <li><strong>Electricity Reduction Rate</strong>: Reduction factor for renewable energy ({ELECTRICITY_REDUCTION_RATE}).</li>
                    </ul>
                    <strong>Detailed Explanation:</strong> Utilizing renewable energy sources can reduce the carbon footprint. The `ELECTRICITY_REDUCTION_RATE` represents the proportion of emissions reduced by switching to renewable energy.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsPage;
