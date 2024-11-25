// @ts-nocheck
import Plot from "react-plotly.js";

const BreakEvenPeriodByCounty = ({ data }) => {
  const aggregatedData = data.reduce((acc, item) => {
    const key = item.County;
    if (!acc[key]) {
      acc[key] = { county: item.County, period: 0, count: 0 };
    }
    acc[key].period += item["Break even period(years)"];
    acc[key].count += 1;
    return acc;
  }, {});

  const chartData = Object.values(aggregatedData).map((item) => ({
    county: item.county,
    avgPeriod: item.period / item.count,
  }));

  return (
    <div>
        <em>*Break-even period measures how long (in years) it would take for rental payments to equal the cost of purchasing a property.</em>
      <Plot
        data={[
          {
            x: chartData.map((d) => d.county),
            y: chartData.map((d) => d.avgPeriod),
            type: "bar",
            name: "Break-even Period",
            marker: { color: "orange" },
          },
        ]}
        layout={{
          title: "Break-even Period (Years) by County",
          xaxis: { title: "County" },
          yaxis: { title: "Break-even Period (Years)", tickformat: ".2f" },
        }}
      />
    </div>
  );
};
export default BreakEvenPeriodByCounty;