// @ts-nocheck
import Plot from "react-plotly.js";

const RentalYieldByBedrooms = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const key = item.County;
    if (!acc[key]) {
      acc[key] = { county: item.County, yield: 0, count: 0 };
    }
    acc[key].yield += item.Yield;
    acc[key].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).map((item) => ({
    county: item.county,
    avgYield: item.yield / item.count,
  }));

  return (
    <div>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgYield),
            type: "bar",
            name: "Rental Yield",
            marker: { color: "#6495ED" },
          },
        ]}
        layout={{
          title: "Rental Yield (%) by County",
          xaxis: { title: "County" },
          yaxis: { title: "Rental Yield (%)", tickformat: ".2f" },
        }}
      />
    </div>
  );
};

export default RentalYieldByBedrooms;
