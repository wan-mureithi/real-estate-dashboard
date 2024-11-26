import { useState } from "react";
import RentalYieldByBedrooms from "../components/RentalYieldByBedrooms";
import BreakEvenPeriodByCounty from "../components/BreakEvenPeriodByCounty";
import PriceComparisonByBedrooms from "../components/PriceComparisonByBedrooms";
import data from "../data/merged_data_combined.json";

const InvestorsDashboard = () => {
  const bedroomOptions = [...new Set(data.map((item) => item.Bedrooms))];
  const [selectedBedroom, setSelectedBedroom] = useState(bedroomOptions[2]);

  const filteredData = data.filter((item) => item.Bedrooms === selectedBedroom);


  return (
    <div style={{ width:'100%', padding:'20px' }}>
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
          gap: "20px",
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
        <div style={{ gridColumn: "span 2" }}>
          <PriceComparisonByBedrooms data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default InvestorsDashboard;
