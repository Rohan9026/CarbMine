import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useFirebase } from '../context/Firebase';
import { Link } from 'react-router-dom';
import DoughnutChart from '../components/DoughnutChart';
import Footer from '../components/Footer';

function Analysis() {
  //Base parameters for estimation
  const [formData, setFormData] = useState({
    excavation: '',
    transportation: '',
    fuel: '',
    equipment: '',
    workers: '',
    output: ''
  });
  const [results, setResults] = useState(null);
  const formRef = useRef();
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
    setResults(result)
  };

  // useStates related to Neutralisation Pathways
  const [neutralisationResults, setNeutralisationResults] = useState(null);
  const [evConversionPercentage, setEvConversionPercentage] = useState(100);
  const [neutralizePercentage, setNeutralizePercentage] = useState(100);
  const [greenFuelPercentage, setGreenFuelPercentage] = useState(100);

  //fetch function for Neutralisation Pathways 
  const handleNeutralise = async () => {
    // if (!results) {
    //   alert("Please utilise the Emission Calculator to calculate your emissions first");
    //   return;
    // }
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

  //handles change in slider values
  useEffect(() => {
    if (results) {
      handleNeutralise();
    }
  }, [evConversionPercentage, neutralizePercentage, greenFuelPercentage, results]);

  //handling section transition of the form
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

  useEffect(() => {
    gsap.fromTo(
      sections.current[currentSection],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
  }, [currentSection]);


  //pdf upload handling section
  const { uploadPDFToFirebase } = useFirebase();

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
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center bg-[#fff]">
      {/* Title and Image Section */}

      <div className="w-full p-8  flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold  mb-2">
            <span>ESTIMATE, ANALYSE,</span>
            <br />
            <span>AND NEUTRALISE</span></h1>
          <p className="text-lg text-gray-700">A comprehensive approach to carbon footprint management</p>
        </div>
        <div className="flex w-full max-w-[50%] place-content-center place-items-center overflow-hidden max-lg:max-w-[unset]">
          <div className="flex h-[430px] w-[430px] max-h-[430px] max-w-[430px] overflow-hidden rounded-full max-lg:h-[320px] max-lg:w-[320px] lg:mt-[-150px]">
            {/* <img
              src="./assets/s1.jfif"
              alt="app"
              className="z-[1] h-full w-full object-cover rounded-full"
            /> */}
          </div>
        </div>
      </div>

      {/* Estimation Section */}
      <hr className="border-gray-300 my-6 w-full" />

      {!results ? (
        <div className="bg-[#fff] p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Carbon Emission Estimator</h2>
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
                  className="bg-[#00F020] text-white py-2 px-4 rounded-md hover:bg-gray-700"
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
        </div>
      ) : (
        <>
          {results && (

            <div className="mt-8 bg-white-800 px-6 py-6 block rounded-md shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center ">Emission Estimation Results</h2>
              <div className="mt-8 space-y-8 px-6 max-w-4xl mx-auto grid grid-cols-4 grid-rows-3 gap-6">
                {/* Excavation Results */}
                <div className="mt-8 bg-blue-100 p-4 rounded-lg mb-4 row-start-1 col-start-1 min-h-50">
                  <h4 className="text-lg font-semibold text-blue-800 ">Excavation</h4>
                  <p>Total Emissions: <span className="font-bold">{results.excavationEmissions.toFixed(2)} kg CO2</span></p>
                  <p>Per Capita Emissions: <span className="font-bold">{results.excavationPerCapita.toFixed(2)} kg CO2 per worker</span></p>
                  <p>Per Output Emissions: <span className="font-bold">{results.excavationPerOutput.toFixed(2)} kg CO2 per ton</span></p>
                </div>

                {/* Transportation Results */}
                <div className=" mt-8 bg-green-100 p-4 rounded-lg mb-4 row-start-1 col-start-2 min-h-40">
                  <h4 className="text-lg font-semibold text-green-800">Transportation</h4>
                  <p>Total Emissions: <span className="font-bold">{results.transportationEmissions.toFixed(2)} kg CO2</span></p>
                  <p>Per Capita Emissions: <span className="font-bold">{results.transportationPerCapita.toFixed(2)} kg CO2 per worker</span></p>
                  <p>Per Output Emissions: <span className="font-bold">{results.transportationPerOutput.toFixed(2)} kg CO2 per ton</span></p>
                </div>

                {/* Equipment Results */}
                <div className=" mt-8 bg-yellow-100 p-4 rounded-lg mb-4 row-start-1 col-start-3 min-h-40">
                  <h4 className="text-lg font-semibold text-yellow-800">Equipment</h4>
                  <p>Total Emissions: <span className="font-bold">{results.equipmentEmissions.toFixed(2)} kg CO2</span></p>
                  <p>Per Capita Emissions: <span className="font-bold">{results.equipmentPerCapita.toFixed(2)} kg CO2 per worker</span></p>
                  <p>Per Output Emissions: <span className="font-bold">{results.equipmentPerOutput.toFixed(2)} kg CO2 per ton</span></p>
                </div>

                {/* Total Results */}
                <div className="mt-8 bg-gray-100 p-4 rounded-lg row-start-1 col-start-4 min-h-50">
                  <h4 className="text-lg font-semibold text-gray-800">Total</h4>
                  <p>Total Emissions: <span className="font-bold">{results.totalEmissions.toFixed(2)} kg CO2</span></p>
                  <p>Total Per Capita Emissions: <span className="font-bold">{results.perCapitaEmissions.toFixed(2)} kg CO2 per worker</span></p>
                  <p>Total Per Output Emissions: <span className="font-bold">{results.perOutputEmissions.toFixed(2)} kg CO2 per ton</span></p>
                </div>
                <div className="col-start-1 col-span-2 row-2 row-span-2 rounded-md shadow-md bg-[#9BEC00] flex items-center justify-center">
                  <h1 className="text-lg font-semibold text-[#fff] text-center">Analysis</h1>
                </div>
                <div className="col-start-3 col-span-2 row-2 row-span-2 w-full"><DoughnutChart data={results} /></div>
              </div>
              <br></br>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center ">Explore Neutralisation Pathways</h3>

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

            </div>
          )}

        </>
      )}


      <button
        onClick={handleGenerateAndStorePDF}
        className="mt-4 bg-[#00F020] text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Generate and Store PDF
      </button>
      <Link to="/view">
        <button
          className="mt-4 bg-[#00F020] text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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