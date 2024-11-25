import Plot from "react-plotly.js";


const RentByBedrooms = ({data}) => {
  const counties = [...new Set(data.map((d) => d.County))];
  const barData = counties.map((county) => {
    const countyData = data.filter((d) => d.County === county);
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