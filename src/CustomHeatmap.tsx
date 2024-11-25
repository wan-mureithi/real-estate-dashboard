import {useState} from "react";
import Plot from "react-plotly.js";

// Data Preparation
const counties = ["Kajiado", "Kiambu", "Kilifi", "Mombasa", "Nairobi"];
const propertyTypes = ["House", "Townhouse", "Villa"];

// Data for sales
const salesData = [
  [18761705.28, 13280252.1, 11283333.33], // Kajiado
  [18830913.07, 18006260.82, 35513095.24], // Kiambu
  [58824488.2, 13782592.59, 46115530.3],   // Kilifi
  [64169928.3, 37328462.96, 60586789.56],  // Mombasa
  [126227595.92, 87758544.51, 140704930.4], // Nairobi
];

// Data for rentals
const rentalData = [
  [60000.0, 85000.0, 40000.0], // Kajiado
  [194150.0, 193783.33333, 286875.0], // Kiambu
  [190833.335, 160875.0, 106875.0],   // Kilifi
  [150000.0, null, 30000.0],          // Kwale
  [85833.335, null, null],            // Laikipia
  [109666.666667, 127500.0, null],    // Machakos
  [197097.62, 104652.776667, 132682.54], // Mombasa
  [471935.767, 381737.821667, 430822.398], // Nairobi
  [72500.0, null, null],              // Nakuru
];

const Heatmap = () => {
  const [isSales, setIsSales] = useState(true);

  // Function to handle checkbox toggle
  const handleToggle = () => setIsSales(!isSales);

  return (
    <div>
      <h2>{isSales ? "Average Sales Prices" : "Average Rental Prices"} by County and Type</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={isSales}
            onChange={handleToggle}
          />
          Show Sales Data
        </label>
      </div>
      <Plot
        data={[
          {
            z: isSales ? salesData : rentalData, 
            x: propertyTypes, // Property types (columns)
            y: counties, // Counties (rows)
            type: "heatmap", // Specify heatmap
            colorscale: isSales ? "YlGnBu" : "Viridis", 
            showscale: true, // Display color scale
          },
        ]}
        layout={{
          title: isSales
          ? "Average Sales Prices by County and Type"
          : "Average Rental Prices by County and Type",
          xaxis: {
            title: "Property Type",
          },
          yaxis: {
            title: "County",
          },
          autosize: true,
        }}
        style={{ width: "100%", height: "500px" }} // Responsive sizing
      />
    </div>
  );
};

export default Heatmap;
