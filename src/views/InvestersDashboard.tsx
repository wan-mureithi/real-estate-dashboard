import { useState } from "react";
import RentalYieldByBedrooms from "../components/RentalYieldByBedrooms";
import BreakEvenPeriodByCounty from "../components/BreakEvenPeriodByCounty";
import PriceComparisonByBedrooms from "../components/PriceComparisonByBedrooms";
import data from "../data/merged_data_combined.json";
import InsightsIcon from '@mui/icons-material/Insights';
import PopulationDensityChart from "../components/PopulationDensityChart";

const InvestorsDashboard = () => {
  const bedroomOptions = [...new Set(data.map((item) => item.Bedrooms))];
  const [selectedBedroom, setSelectedBedroom] = useState(bedroomOptions[2]);

  const filteredData = data.filter((item) => item.Bedrooms === selectedBedroom);


  return (
    <div style={{padding:'0 15px'}}>
      <h2>Investors Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="bedroomFilter">Filter by Number of Bedrooms: </label>
        <select
          id="bedroomFilter"
          value={selectedBedroom}
          onChange={(e) => setSelectedBedroom(Number(e.target.value))}
        >
          {bedroomOptions.map((bedroom) => (
            <option key={bedroom} value={bedroom}>
              {bedroom} Bedroom(s)
            </option>
          ))}
        </select>
      </div>

      {/* Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two columns
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* Row 1 */}
        <div>
          <RentalYieldByBedrooms data={filteredData} />
        </div>
        <div>
          <BreakEvenPeriodByCounty data={filteredData} />
        </div>

        {/* Row 2 */}
        <div>
          <PriceComparisonByBedrooms data={filteredData} />
        </div>
        <div>
          <PopulationDensityChart data={filteredData}/>
        </div>
        <div style={{backgroundColor:'white',padding:'10px'}}>
          <p style={{color:'black', textAlign:'center', fontSize:'18px', margin:0 }}>
<InsightsIcon sx={{mr:'5px'}}/>
Key insights
          </p>
        <ul style={{color:'black'}}>
          <li >Rental yield measures the annual return on investment (ROI) for a rental property, expressed as a percentage of the property’s purchase price. 
          It helps investors evaluate how much income they can generate from a rental property relative to its cost.</li>
          <li>
        Break-even period measures how long (in years) it would take for rental payments to equal the cost of purchasing a property
        </li>
        <li>
              A county with high sales prices but moderate rental prices may favor renting over buying, and vice versa.

              </li>
      </ul>
        </div>

        
      </div>
    </div>
  );
};

export default InvestorsDashboard;
