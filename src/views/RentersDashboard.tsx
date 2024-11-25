import { useState } from "react";
import Plot from "react-plotly.js";
import RentByBedrooms from "../components/RentByBedrooms";
import data from "../data/merged_data.json" 
import BreakEvenChart from "../components/BreakEvenChart";
import CountyComparison from "../components/CountyComparison";
// Sample Data
const counties = ["Kajiado", "Kiambu", "Kilifi", "Mombasa", "Nairobi"];
const propertyTypes = ["House", "Townhouse", "Villa"];
const rentalData = [
  [60000, 85000, 40000], // Kajiado
  [194150, 193783, 286875], // Kiambu
  [190833, 160875, 106875], // Kilifi
  [197097, 104652, 132682], // Mombasa
  [471935, 381737, 430822], // Nairobi
];

const RentersDashboard = () => {
    const [selectedType, setSelectedType] = useState("House")
    const filteredData = data.filter((item) => item.Type === selectedType);
  return (
    <div>
      <h2>Renters Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="propertyType">Filter by Property Type: </label>
        <select
          id="propertyType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="House">House</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Villa">Villa</option>
        </select>
      </div>
     {/* Grid layout for the charts */}
     <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two columns
          gap: "20px", // Spacing between grid items
          marginTop: "20px",
        }}
      >
        {/* Row 1: Heatmap and CountyComparison */}
        <div>
          <Plot
            data={[
              {
                z: rentalData,
                x: propertyTypes,
                y: counties,
                type: "heatmap",
                colorscale: "Viridis",
                showscale: true,
              },
            ]}
            layout={{
              title: "Average Rental Prices by County and Property Type",
              xaxis: { title: "Property Type" },
              yaxis: { title: "County" },
            }}
          />
        </div>
        <div>
          <CountyComparison data={filteredData} />
        </div>

        {/* Row 2: RentByBedrooms and BreakEvenChart */}
        <div>
          <RentByBedrooms data={filteredData} />
        </div>
        <div>
          <BreakEvenChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default RentersDashboard;
