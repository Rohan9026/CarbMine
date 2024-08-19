import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useFirebase } from '../context/Firebase';
import { Link } from 'react-router-dom';

function Analysis() {
  const [formData, setFormData] = useState({
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: ''
  });

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
        emissions: results?.totalEmissions || 0,
        transportation: formData.transportation,
        fuel: formData.fuel,
      }),
    });
    const result = await response.json();
    setNeutralisationResults(result);
  };

  const [results, setResults] = useState(null);
  const formRef = useRef();

  const { uploadPDFToFirebase } = useFirebase();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [neutralisationResults, setNeutralisationResults] = useState(null);

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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center" ref={formRef}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" ref={formRef}>
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
      </div><br></br>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Carbon Neutralization Pathways</h2>
        <p className="text-lg mb-4">
          To mitigate the impact of your emissions, we can explore various neutralisation strategies.
          Click the button below to get recommendations for reducing your carbon footprint through
          different pathways such as afforestation and clean technologies.
        </p>
        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={handleNeutralise}>Suggest Neutralisation Pathways</button>
        {neutralisationResults && (
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Neutralisation Pathways:</h3>
            <p>Transportation CO2 Reduction: <span className="font-bold">{neutralisationResults.transportation_co2_reduction?.toFixed(2) || 0} kg CO2</span></p>
            <p>Fuel CO2 Reduction: <span className="font-bold">{neutralisationResults.fuel_co2_reduction?.toFixed(2) || 0} kg CO2</span></p>
            <p>Remaining Emissions After Reduction: <span className="font-bold">{neutralisationResults.remaining_emissions_after_reduction?.toFixed(2) || 0} kg CO2</span></p>
            <p>Land Required for Afforestation: <span className="font-bold">{neutralisationResults.land_required_for_afforestation_hectares?.toFixed(2) || 0} hectares</span></p>
            <p>Estimated Electricity Savings: <span className="font-bold">{neutralisationResults.estimated_electricity_savings_mwh?.toFixed(2) || 0} MWh</span></p>
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
    </div>
  );
}

export default Analysis;