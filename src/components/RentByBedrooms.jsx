import React from "react";
import Plot from "react-plotly.js";
import customData from '../data/merged_data.json'

// Sample Data
const data = [
  { County: "Kajiado", Bedrooms: 1, Price_rent: 10000 },
  { County: "Kajiado", Bedrooms: 2, Price_rent: 35000 },
  { County: "Kajiado", Bedrooms: 3, Price_rent: 48333.33 },
  { County: "Kajiado", Bedrooms: 4, Price_rent: 76666.67 },
  { County: "Kajiado", Bedrooms: 5, Price_rent: 130000 },
  { County: "Kiambu", Bedrooms: 3, Price_rent: 88600 },
  { County: "Nairobi", Bedrooms: 4, Price_rent: 166350 },
];

const RentByBedrooms = () => {
  const counties = [...new Set(customData.map((d) => d.County))];
  const barData = counties.map((county) => {
    const countyData = customData.filter((d) => d.County === county);
    return {
      x: countyData.map((d) => d.Bedrooms),
      y: countyData.map((d) => d.Price_rent),
      type: "bar",
      name: county,
    };
  });

  return (
    <div>
      <h3>Average Rental Prices by Bedrooms</h3>
      <Plot
        data={barData}
        layout={{
          title: "Rental Prices by Bedrooms and County",
          xaxis: { title: "Number of Bedrooms" },
          yaxis: { title: "Rental Price (KES)" },
          barmode: "group",
        }}
      />
    </div>
  );
};

export default RentByBedrooms;
