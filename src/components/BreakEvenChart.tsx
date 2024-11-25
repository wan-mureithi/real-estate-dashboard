import React from "react";
import Plot from "react-plotly.js";

const BreakEvenChart = ({ data }) => {
  // Extract unique counties
  const counties = [...new Set(data.map((d) => d.County))];

  // Prepare data for the line chart
  const lineData = counties.map((county) => {
    const countyData = data.filter((d) => d.County === county);
    return {
      x: countyData.map((d) => d.Bedrooms), // Number of Bedrooms
      y: countyData.map((d) => d["Break even period(years)"]), // Break-even Period
      type: "scatter",
      mode: "lines+markers",
      name: county,
    };
  });

  return (
    <div>
      <h3>Break-even Period by Bedrooms</h3>
      <Plot
      style={{ width:'600px'}}
        data={lineData}
        layout={{
          title: "Break-even Period (Rent vs Buy)",
          xaxis: { title: "Number of Bedrooms" },
          yaxis: { title: "Break-even Period (years)" },
        }}
      />
    </div>
  );
};

export default BreakEvenChart;
