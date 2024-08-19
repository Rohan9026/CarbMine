import React, { useState } from 'react';

function EmissionEstimate() {
  const [formData, setFormData] = useState({
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: ''
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    setResults(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Carbon Emission Estimator</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Excavation (tons):</label>
            <input
              type="number"
              name="excavation"
              value={formData.excavation}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Transportation (km):</label>
            <input
              type="number"
              name="transportation"
              value={formData.transportation}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Fuel Consumption (liters):</label>
            <input
              type="number"
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Equipment Usage (hours):</label>
            <input
              type="number"
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Workers:</label>
            <input
              type="number"
              name="workers"
              value={formData.workers}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Output (tons):</label>
            <input
              type="number"
              name="output"
              value={formData.output}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Calculate Emissions
          </button>
        </form>

        {results && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Results:</h3>
            <p>Total Emissions: <span className="font-bold">{results.totalEmissions.toFixed(2)} kg CO2</span></p>
            <p>Per Capita Emissions: <span className="font-bold">{results.perCapitaEmissions.toFixed(2)} kg CO2 per worker</span></p>
            <p>Per Output Emissions: <span className="font-bold">{results.perOutputEmissions.toFixed(2)} kg CO2 per ton</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmissionEstimate;
