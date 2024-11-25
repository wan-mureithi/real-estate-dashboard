// @ts-nocheck
import Plot from "react-plotly.js";

const HeatmapComparison = ({ data }) => {
  // Extract unique counties and property types
  const counties = [...new Set(data.map((d) => d.County))];
  const propertyTypes = [...new Set(data.map((d) => d.Type))];

  // Prepare data for heatmap
  const salesHeatmap = propertyTypes.map((type) =>
    counties.map(
      (county) =>
        data
          .filter((d) => d.County === county && d.Type === type)
          .reduce((sum, d) => sum + d.Price_sales, 0) /
        data.filter((d) => d.County === county && d.Type === type).length || 0
    )
  );

  const rentHeatmap = propertyTypes.map((type) =>
    counties.map(
      (county) =>
        data
          .filter((d) => d.County === county && d.Type === type)
          .reduce((sum, d) => sum + d.Price_rent, 0) /
        data.filter((d) => d.County === county && d.Type === type).length || 0
    )
  );

  return (
    <div>
      <h3>Sales and Rental Prices Heatmap</h3>

      {/* Sales Prices Heatmap */}
      <Plot
        data={[
          {
            z: salesHeatmap,
            x: counties,
            y: propertyTypes,
            type: "heatmap",
            colorscale: "Reds",
          },
        ]}
        layout={{
          title: "Average Sales Prices by County and Property Type",
          xaxis: { title: "County" },
          yaxis: { title: "Property Type" },
        }}
      />

      {/* Rental Prices Heatmap */}
      <Plot
        data={[
          {
            z: rentHeatmap,
            x: counties,
            y: propertyTypes,
            type: "heatmap",
            colorscale: "Blues",
          },
        ]}
        layout={{
          title: "Average Rental Prices by County and Property Type",
          xaxis: { title: "County" },
          yaxis: { title: "Property Type" },
        }}
      />
    </div>
  );
};

export default HeatmapComparison;
