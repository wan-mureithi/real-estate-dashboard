import { useState } from "react";
import Plot from "react-plotly.js";
import RentByBedrooms from "../components/RentByBedrooms";
import data from "../data/merged_data.json" 
import BreakEvenChart from "../components/BreakEvenChart";
import CountyComparison from "../components/CountyComparison";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
const bedroomOptions = [...new Set(data.map((item) => item.Bedrooms))];

const RentersDashboard = () => {
  const [selectedBedroom, setSelectedBedroom] = useState(bedroomOptions[2]);
  const filteredData = data.filter((item) => item.Bedrooms === selectedBedroom);
  return (
    <div style={{padding:'0 15px'}}>
     <div style={{display:'flex', justifyContent:'space-between'}}>
     <div>
     <h2>Renters Dashboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="propertyType">Filter by Property Type: </label>
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
     </div>
      <div style={{marginRight:'10px'}}>
        <div>
          <p style={{margin:'2px', fontWeight:'bold'}}>Data sources</p>
        </div>
        <div style={{fontSize:'11px'}}>
       <div style={{display:'flex', gap:2, alignItems:'center'}}>
       <OpenInNewIcon sx={{ fontSize:'12px'}} fontSize="small"/>
       <p style={{textDecoration:'underline', offset:'3px',margin:0 }}> 
        <a href="https://www.buyrentkenya.com/" target="_blank" style={{ color:'white'}}>Buy rent kenya</a>
       </p>
       </div>
       <div style={{display:'flex', gap:2, alignItems:'center'}}>
       <OpenInNewIcon sx={{ fontSize:'12px'}} fontSize="small"/>
       <p style={{textDecoration:'underline', offset:'3px',margin:0 }}>
        <a href="https://www.knbs.or.ke/reports/kenya-census-2019/" target="_blank"  style={{ color:'white'}}>Population and housing census</a>
       </p>
       </div>
      </div>
      </div>
     </div>
     {/* Grid layout for the charts */}
     <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two columns
          gap: "15px",
        }}
      >
        <div>
          <BreakEvenChart data={filteredData} />
        </div>
        <div>
          <RentByBedrooms data={filteredData} />
        </div>
        <div>
          <div style={{backgroundColor:'white',padding:'10px'}}>
            <ul style={{color:'black'}}>
              <li>Break-even period measures how long (in years) it would take for rental payments to equal the cost of purchasing a property.</li>
            </ul>

          </div>
          {/* <Plot
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
          /> */}
        </div>
        {/* <div>
          <CountyComparison data={filteredData} />
        </div> */}

        
        
        
      </div>
    </div>
  );
};

export default RentersDashboard;
