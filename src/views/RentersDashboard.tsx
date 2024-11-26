import { useState } from "react";
import RentByBedrooms from "../components/RentByBedrooms";
import data from "../data/merged_data_combined.json" 
import BreakEvenChart from "../components/BreakEvenChart";
import InsightsIcon from '@mui/icons-material/Insights';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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
         <div style={{height:'350px'}}>
         <div style={{backgroundColor:'white',padding:'10px'}}>
         <p style={{color:'black', textAlign:'center', fontSize:'18px', margin:0 }}>
<InsightsIcon sx={{mr:'5px'}}/>
Key insights
          </p>
            <ul style={{color:'black'}}>
              <li>Break-even period measures how long (in years) it would take for rental payments to equal the cost of purchasing a property.</li>
              <li>
              In Kajiado, it takes 12 years of rent to equal the average buying cost of a 3bedroom property
              </li>
            </ul>

          </div>
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
