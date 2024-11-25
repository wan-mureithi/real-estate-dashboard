import React from "react";
import Plot from "react-plotly.js";

// Sample Data
const counties = ["Kajiado", "Kiambu", "Kilifi", "Mombasa", "Nairobi"];
const rentalPrices = [85000, 193783, 160875, 104652, 381737];
const salesPrices = [13000000, 18006260, 13782592, 37328462, 87758544];

const InvestorsDashboard = () => {
  return (
    <div>
      <h2>Investors Dashboard</h2>

      {/* Bubble Chart */}
      <Plot
        data={[
          {
            x: rentalPrices,
            y: [52, 951, 119, 5515, 6319], // Population Density
            text: counties.map(
              (county, i) =>
                `${county}<br>Rent: KES ${rentalPrices[i].toLocaleString()}<br>Sales Price: KES ${salesPrices[i].toLocaleString()}`
            ),
            mode: "markers",
            marker: {
              size: salesPrices.map((price) => price / 1000000), // Bubble size = sales price
              sizemode: "area",
              color: [52, 951, 119, 5515, 6319], // Population density-based color
              colorscale: "Viridis",
            },
          },
        ]}
        layout={{
          title: "Rental Price vs Population Density",
          xaxis: { title: "Rental Price (KES)" },
          yaxis: { title: "Population Density (people/km²)" },
        }}
      />

      {/* Combined Chart */}
      <Plot
        data={[
          {
            x: counties,
            y: rentalPrices,
            type: "bar",
            name: "Rental Prices",
            marker: {
              color: "rgba(93, 164, 214, 0.6)",
            },
          },
          {
            x: counties,
            y: salesPrices,
            type: "scatter",
            mode: "lines+markers",
            name: "Sales Prices",
            line: {
              color: "rgba(255, 99, 132, 1)",
              width: 2,
            },
          },
        ]}
        layout={{
          title: "Comparison of Rental and Sales Prices by County",
          xaxis: { title: "County" },
          yaxis: { title: "Price (KES)", tickformat: "," },
          barmode: "overlay", // Overlay bars and line chart
        }}
      />

      {/* Line Chart */}
      <Plot
        data={[
          {
            x: ["House", "Townhouse", "Villa"], // Property Types
            y: [60000, 85000, 40000], // Rental Prices for Kajiado (example)
            type: "scatter",
            mode: "lines+markers",
            name: "Kajiado",
          },
          {
            x: ["House", "Townhouse", "Villa"], // Property Types
            y: [194150, 193783, 286875], // Rental Prices for Kiambu (example)
            type: "scatter",
            mode: "lines+markers",
            name: "Kiambu",
          },
        ]}
        layout={{
          title: "Trends in Rental Prices Across Property Types",
          xaxis: { title: "Property Type" },
          yaxis: { title: "Rental Price (KES)" },
        }}
      />
    </div>
  );
};

export default InvestorsDashboard;
