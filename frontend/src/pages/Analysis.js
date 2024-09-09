import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function Analysis() {
  const [formData, setFormData] = useSta
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: ''
  });

  const [neutralisationResults, setNeutralisationResults] = useState(null);
  const [evConversionPercentage, setEvConversionPercentage] = useState(100);
  const [neutralizePercentage, setNeutralizePercentage] = useState(100);
  const [greenFuelPercentage, setGreenFuelPercentage] = useState(100);

  const [results, setResults] = useState(null);
  const sections = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);

  const showNextSection = () => {
    if (currentSection < sections.current.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const showPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

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

  useEffect(() => {
    if (results) {
      handleNeutralise();
    }
  }, [evConversionPercentage, neutralizePercentage, greenFuelPercentage]);

  useEffect(() => {
    gsap.fromTo(
      sections.current[currentSection],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [currentSection]);

  const handleNeutralise = async () => {
    if (!results) {
      alert("Please utilise the Emission Calculator to calculate your emissions first");
      return;
    }
    const response = await fetch('http://localhost:5000/neutralise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        green_fuel_percentage: greenFuelPercentage,
        neutralise_percentage: neutralizePercentage,
        ev_transportaion_percentage: evConversionPercentage,
        emissions: results?.totalEmissions || 0,
        transportation: formData.transportation,
        fuel: formData.fuel,
      }),
    });
    const neutraliseResult = await response.json();
    setNeutralisationResults(neutraliseResult);
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col justify-center items-center py-4">
      {/* Title and Image Section */}
      <div className="w-full bg-gray-50 p-8 shadow-lg flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">Estimate, Analyse, and Neutralise</h1>
          <p className="text-lg text-gray-700">A comprehensive approach to carbon footprint management</p>
        </div>
        <div className="w-1/3">
          <img src="/path/to/your/image.jpg" alt="Carbon Neutral" className="rounded-lg shadow-md" />
        </div>
      </div>

      {/* Estimation Section */}
      <hr className="border-gray-300 my-6 w-full" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Carbon Emission Estimator</h2>

        {!results ? (
          <form onSubmit={handleSubmit}>
            {/* Section for Excavation */}
            <div ref={(el) => (sections.current[0] = el)} style={{ display: currentSection === 0 ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700">Excavation (tons):</label>
              <input
                type="number"
                name="excavation"
                value={formData.excavation}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={showNextSection}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Section for Transportation */}
            <div ref={(el) => (sections.current[1] = el)} style={{ display: currentSection === 1 ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700">Transportation (km):</label>
              <input
                type="number"
                name="transportation"
                value={formData.transportation}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={showPreviousSection}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={showNextSection}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Section for Fuel */}
            <div ref={(el) => (sections.current[2] = el)} style={{ display: currentSection === 2 ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700">Fuel Consumption (liters):</label>
              <input
                type="number"
                name="fuel"
                value={formData.fuel}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={showPreviousSection}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={showNextSection}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Section for Equipment */}
            <div ref={(el) => (sections.current[3] = el)} style={{ display: currentSection === 3 ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700">Equipment Usage (hours):</label>
              <input
                type="number"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={showPreviousSection}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={showNextSection}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Section for Workers */}
            <div ref={(el) => (sections.current[4] = el)} style={{ display: currentSection === 4 ? 'block' : 'none' }}>
              <label className="block text-sm font-medium text-gray-700">Number of Workers:</label>
              <input
                type="number"
                name="workers"
                value={formData.workers}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={showPreviousSection}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Previous
                </button>
                <button type="button" onClick={showNextSection} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover" > Next </button> </div> </div>
        <div ref={(el) => (sections.current[5] = el)} style={{ display: currentSection === 5 ? 'block' : 'none' }}>
          <label className="block text-sm font-medium text-gray-700">Output (tons):</label>
          <input
            type="number"
            name="output"
            value={formData.output}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={showPreviousSection}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    ) : (
      <>
        <h2 className="text-xl font-bold mb-4">Emission Results</h2>
        {results && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Results:</h3>
 {/* Display Results */}
            {/* ... */}
            {/* Add the DoughnutChart component */}
            <DoughnutChart data={results} />
          </div>
        )}
        <h3 className="text-lg font-bold mt-6 mb-2">Explore Neutralisation Pathways</h3>

        <label className="block text-sm font-medium text-gray-700 mt-2">Electric Vehicle Conversion:</label>
        <input
          type="range"
          value={evConversionPercentage}
          onChange={(e) => setEvConversionPercentage(Number(e.target.value))}
          min="0"
          max="100"
          className="mt-1 w-full"
        />
        <p className="text-sm text-gray-600">{evConversionPercentage}%</p>

        <label className="block text-sm font-medium text-gray-700 mt-2">Neutralize Footprint:</label>
        <input
          type="range"
          value={neutralizePercentage}
          onChange={(e) => setNeutralizePercentage(Number(e.target.value))}
          min="0"
          max="100"
          className="mt-1 w-full"
        />
        <p className="text-sm text-gray-600">{neutralizePercentage}%</p>

        <label className="block text-sm font-medium text-gray-700 mt-2">Shift to Green Fuel:</label>
        <input
          type="range"
          value={greenFuelPercentage}
          onChange={(e) => setGreenFuelPercentage(Number(e.target.value))}
          min="0"
          max="100"
          className="mt-1 w-full"
        />
        <p className="text-sm text-gray-600">{greenFuelPercentage}%</p>

        {neutralisationResults && (
          <>
            <h3 className="text-lg font-bold mt-6 mb-2">Neutralisation Results</h3>
            <p>Required Land for Afforestation: {neutralisationResults.land_required_for_afforestation_hectares} hectares</p>
          </>
        )}
      </>
    )}
  </div>
</div>
); }

export default Analysis;