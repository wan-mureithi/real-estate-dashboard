import React from "react";
import Plot from "react-plotly.js";

interface DataItem {
  County: string;
  "Population Density": number;
  Price_rent: number;
}

interface PopulationDensityChartProps {
  data: DataItem[];
}

const PopulationDensityChart: React.FC<PopulationDensityChartProps> = ({ data }) => {
  // Aggregate data by county
  const aggregatedData = data.reduce<Record<string, { county: string; density: number; rent: number; count: number }>>(
    (acc, item) => {
      const key = item.County;
      if (!acc[key]) {
        acc[key] = { county: item.County, density: 0, rent: 0, count: 0 };
      }
      acc[key].density += item["Population Density"];
      acc[key].rent += item.Price_rent;
      acc[key].count += 1;
      return acc;
    },
    {}
  );

  const chartData = Object.values(aggregatedData).map((item) => ({
    county: item.county,
    avgDensity: item.density / item.count,
    avgRent: item.rent / item.count,
  }));

  return (
    <div>
      {/* <h3>Population Density vs Rental Price by County</h3> */}
      <Plot
        data={[
          // Bar for Population Density
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgDensity),
            type: "bar",
            name: "Population Density",
            marker: { color: "#8FBC8F" },
            yaxis: "y1", // Link to y-axis 1
          },
          // Line for Rental Price
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgRent),
            type: "scatter",
            mode: "lines+markers",
            name: "Rental Price",
            line: { color: "#2E8B57", width: 3 },
            marker: { color: "#2E8B57", size: 6 },
            yaxis: "y2", // Link to y-axis 2
          },
        ]}
        layout={{
          title: "Population Density vs Rental Price by County",
          xaxis: { title: "County" },
          yaxis: {
            title: "Population Density (per km²)",
            titlefont: { color: "#8FBC8F" },
            tickfont: { color: "#8FBC8F" },
          },
          yaxis2: {
            title: "Average Rental Price (KES)",
            titlefont: { color: "#2E8B57" },
            tickfont: { color: "#2E8B57" },
            overlaying: "y", // Overlay on y1
            side: "right", // Position on the right
          },
        }}
      />
    </div>
  );
};

export default PopulationDensityChart;
