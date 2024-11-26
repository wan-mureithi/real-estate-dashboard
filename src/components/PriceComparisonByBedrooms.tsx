// @ts-nocheck
import Plot from "react-plotly.js";

const PriceComparisonByBedrooms = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const key = item.County;
    if (!acc[key]) {
      acc[key] = { county: item.County, sales: 0, rent: 0, count: 0 };
    }
    acc[key].sales += item.Price_sales;
    acc[key].rent += item.Price_rent;
    acc[key].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).map((item) => ({
    county: item.county,
    avgSales: item.sales / item.count,
    avgRent: item.rent / item.count,
  }));

  return (
    <div>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgSales),
            type: "bar",
            name: "Sales Price",
            marker: { color: "#6495ED" },
            yaxis: "y1", // Link this to y-axis 1
          },
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgRent),
            type: "line",
            name: "Rental Price",
            marker: { color: "#191970" },
            yaxis: "y2", // Link this to y-axis 2
          },
        ]}
        layout={{
          title: "Sales vs Rental Prices by County",
          xaxis: { title: "County" },
          yaxis: {
            title: "Average Sales Price (KES)",
            titlefont: { color: "#6495ED" },
            tickfont: { color: "#6495ED" },
          },
          yaxis2: {
            title: "Average Rental Price (KES)",
            titlefont: { color: "#191970" },
            tickfont: { color: "#191970" },
            overlaying: "y", // Overlay this axis on y1
            side: "right", // Position this axis on the right
          },
          //barmode: "group", // Group bars together
        }}
      />
    </div>
  );
};

export default PriceComparisonByBedrooms;
