import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useFirebase } from '../context/Firebase';
import { Link } from 'react-router-dom';
import DoughnutChart from '../components/DoughnutChart';

import Footer from '../components/Footer';

function Analysis() {
  const [formData, setFormData] = useState({
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: ''
  });

  // useStates related to Neutralisation Pathways
  const [neutralisationResults, setNeutralisationResults] = useState(null);
  const [evConversionPercentage, setEvConversionPercentage] = useState(100);
  const [neutralizePercentage, setNeutralizePercentage] = useState(100);
  const [greenFuelPercentage, setGreenFuelPercentage] = useState(100);

  //fetch function for Neutralisation Pathways 
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

  // useEffect that listens to changes in slider values
  useEffect(() => {
    if (neutralisationResults) {
      handleNeutralise();
    }
  }, [evConversionPercentage, neutralizePercentage, greenFuelPercentage]);

  const [results, setResults] = useState(null);
  const formRef = useRef();

  const { uploadPDFToFirebase } = useFirebase();

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

  const handleGenerateAndStorePDF = async () => {
    try {
      const canvas = await html2canvas(formRef.current, {
        scale: 2, // Increase scale for higher resolution
        useCORS: true, // Enable CORS if your images are from a different origin
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // Change the format to 'a4' for better fitting
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const pdfBlob = pdf.output('blob');

      const downloadURL = await uploadPDFToFirebase(pdfBlob);
      alert(`PDF generated and stored successfully! View it here: ${downloadURL}`);
    } catch (error) {
      console.error("Error generating or storing PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };


  return (
    <div className="min-h-screen min-w-screen bg-gray-100 flex flex-col justify-center items-center py-2">
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
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Results:</h3>
            {/* Display Results */}
            {/* ... */}
            {/* Add the DoughnutChart component */}
            <DoughnutChart data={results} />
          </div>
        )}
      </div>
      <br></br>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Carbon Neutralization Pathways</h2>
        <p className="text-lg mb-4 text-justify">
          To mitigate the impact of your emissions, we can explore various neutralisation strategies.
          Click the button below to get recommendations for reducing your carbon footprint through
          different pathways such as afforestation and clean technologies.
        </p>
        <label className="block text-sm font-medium text-gray-700">
          Percentage of Footprint to Neutralise:
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={neutralizePercentage}
          onChange={(e) => setNeutralizePercentage(e.target.value)}
          className="w-full h-2 bg-gray-200 appearance-none rounded-lg cursor-pointer range-slider-green"
        />
        <p>{neutralizePercentage}%</p>
        <label className="block text-sm font-medium text-gray-700 mt-4">
          Percentage of Transportation to Convert to EV:
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={evConversionPercentage}
          onChange={(e) => setEvConversionPercentage(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p>{evConversionPercentage}%</p>

        <label className="block text-sm font-medium text-gray-700 mt-4">
          Percentage of Fuel to Shift to Green Fuel:
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={greenFuelPercentage}
          onChange={(e) => setGreenFuelPercentage(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p>{greenFuelPercentage}%</p>
        <br></br>

        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleNeutralise}>Suggest Neutralisation Pathways</button>
        {neutralisationResults && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Neutralisation Pathways To Achieve {neutralizePercentage}% Of The Carbon Footprint</h3>
            <p >Total Carbon Footprint: <span className="font-bold">{neutralisationResults.emissions?.toFixed(2) || 0} kg CO2</span></p>
            <p className='py-2'>Target Carbon Footprint To Be Neutralised: <span className="font-bold">{neutralisationResults.emissions_to_be_neutralised?.toFixed(2) || 0} kg CO2</span></p>

            <div className="bg-blue-100 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-blue-800">EV Transportation</h4>
              <p>CO2 Reduction Obtained By Converting {evConversionPercentage}% Of Transportation to EV: <span className="font-bold">{neutralisationResults.transportation_footprint_reduction?.toFixed(2) || 0} kg CO2</span></p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-yellow-800">Green Fuel</h4>
              <p>CO2 Reduction Obtained By Replacing {greenFuelPercentage}% Fuel With Green Fuel: <span className="font-bold">{neutralisationResults.fuel_footprint_reduction?.toFixed(2) || 0} kg CO2</span></p>
            </div>

            <p className='py-2'>Remaining Emissions After Reduction: <span className="font-bold">{neutralisationResults.remaining_footprint_after_reduction?.toFixed(2) || 0} kg CO2</span></p>

            <div className="bg-green-100 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-green-800">Afforestation</h4>
              <p>Land Required for Afforestation To Neutralise The Remaining Emissions: <span className="font-bold">{neutralisationResults.land_required_for_afforestation_hectares?.toFixed(2) || 0} hectares</span></p>
            </div>

            <p className='py-2'>Estimated Electricity Savings: <span className="font-bold">{neutralisationResults.estimated_electricity_savings_mwh?.toFixed(2) || 0} MWh</span></p>

            <p>Remaining Emissions After Following Complete Steps: <span className="font-bold">{neutralisationResults.overall_reamaining_footprint?.toFixed(2) || 0} kg CO2</span> </p>
          </div>
        )}
      </div>


      <button
        onClick={handleGenerateAndStorePDF}
        className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Generate and Store PDF
      </button>
      <Link to="/view">
        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          View Data
        </button>
      </Link>
      <hr className="w-full border-t border-gray-300 my-4" />

      <div className="w-full bg-gray-800 ">
        <Footer />
      </div>
    </div>
  );
}

export default Analysis;