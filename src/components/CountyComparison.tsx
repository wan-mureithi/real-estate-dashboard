// @ts-nocheck
import Plot from "react-plotly.js";

const CountyComparison = ({ data }) => {
  // Extract unique counties
  const counties = [...new Set(data.map((d) => d.County))];

  // Prepare data for the horizontal bar chart
  const barData = counties.map((county) => {
    const countyData = data.filter((d) => d.County === county);
    return {
      x: countyData.map((d) => d.Price_rent), // Rental Prices
      y: countyData.map((d) => `${county} (${d.Bedrooms} BR)`), // County with Bedrooms
      type: "bar",
      orientation: "h",
      name: county,
    };
  });

  return (
    <div>
      <Plot
        data={barData}
        style={{ width:'750px'}}
        layout={{
            title: "County-wise Rental Price Comparison",
            xaxis: {
              title: "Rental Price (KES)",
              tickformat: ",", // Add thousands separators
            },
            yaxis: {
              title: "County and Bedrooms",
              tickfont: {
                size: 12, // Increase font size
                family: "Arial, sans-serif", // Use a clear font
              },
              automargin: true, // Ensure labels fit within the chart
            },
            margin: {
              l: 150, // Increase left margin for long labels
            },
            height: 600, // Adjust chart height to reduce label density
            barmode: "stack", // Stack bars for better readability
          }}
  
      />
    </div>
  );
};

export default CountyComparison;
