import React from "react";
import Plot from "react-plotly.js";

// Data: Replace with dynamic data as needed
const data = [
  {
    county: "Kajiado",
    avg_rent: 85000,
    population_density: 52,
    avg_sales_price: 13280252.1,
  },
  {
    county: "Kiambu",
    avg_rent: 193783,
    population_density: 951,
    avg_sales_price: 18006260.82,
  },
  {
    county: "Kilifi",
    avg_rent: 160875,
    population_density: 119,
    avg_sales_price: 13782592.59,
  },
  {
    county: "Mombasa",
    avg_rent: 104652,
    population_density: 5515,
    avg_sales_price: 37328462.96,
  },
  {
    county: "Nairobi",
    avg_rent: 381737,
    population_density: 6319,
    avg_sales_price: 87758544.51,
  },
];

// Scatter plot configuration
const RentalInvestmentScatter = () => {
  const x = data.map((item) => item.avg_rent); // X-axis: Average Rental Price
  const y = data.map((item) => item.population_density); // Y-axis: Population Density
  const sizes = data.map((item) => item.avg_sales_price / 100000); // Bubble Size: Sales Price in Millions
  const labels = data.map(
    (item) =>
      `${item.county}: 
      Rent: KES ${item.avg_rent.toLocaleString()}, 
      Density: ${item.population_density} people/km²,
      Sales Price: KES ${item.avg_sales_price.toLocaleString()}`
  ); // Tooltip labels

  return (
    <div>
      <h2>Best Locations for Rental Investments</h2>
      <Plot
        data={[
          {
            x: x,
            y: y,
            text: labels, // Tooltip for each bubble
            mode: "markers",
            marker: {
              size: sizes, // Bubble sizes
              sizemode: "area",
              sizeref: 2.0, // Adjust size scale
              color: sizes, // Color bubbles by sales price
              colorscale: "Viridis", // Color scale for better visual
              showscale: true, // Show color scale
            },
          },
        ]}
        layout={{
          title: "Rental Prices vs Population Density",
          xaxis: {
            title: "Average Monthly Rent (KES)",
            tickformat: ",", // Format numbers with commas
          },
          yaxis: {
            title: "Population Density (people/km²)",
          },
          hovermode: "closest", // Show tooltips on hover
          showlegend: false, // Hide legend (not needed for this chart)
          autosize: true,
        }}
        style={{ width: "100%", height: "500px" }} // Responsive container
      />
    </div>
  );
};

export default RentalInvestmentScatter;
