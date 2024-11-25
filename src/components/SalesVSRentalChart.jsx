import React from "react";
import Plot from "react-plotly.js";

const SalesVsRentalChart = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const key = `${item.Bedrooms}`;
    if (!acc[key]) {
      acc[key] = { bedrooms: item.Bedrooms, rent: 0, sales: 0, count: 0 };
    }
    acc[key].rent += item.Price_rent;
    acc[key].sales += item.Price_sales;
    acc[key].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).map((item) => ({
    bedrooms: `${item.bedrooms} BR`,
    avgRent: item.rent / item.count,
    avgSales: item.sales / item.count,
  }));

  return (
    <div>
      <h3>Sales vs Rental Prices by Bedrooms</h3>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.bedrooms),
            y: chartData.map((d) => d.avgRent),
            type: "bar",
            name: "Rental Price",
            marker: { color: "blue" },
          },
          {
            x: chartData.map((d) => d.bedrooms),
            y: chartData.map((d) => d.avgSales),
            type: "bar",
            name: "Sales Price",
            marker: { color: "red" },
          },
        ]}
        layout={{
          title: "Rental vs Sales Prices by Bedrooms",
          xaxis: { title: "Bedrooms" },
          yaxis: { title: "Price (KES)", tickformat: "," },
          barmode: "group",
        }}
      />
    </div>
  );
};

export default SalesVsRentalChart;
