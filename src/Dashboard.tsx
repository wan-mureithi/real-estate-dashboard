import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import CountiesSaleRent, {Example} from "./CountiesSaleRent";
import Heatmap from "./CustomHeatmap";
import RentalInvestmentScatter from "./RentalInvestment";

// Transform function
function transformData(data) {
  // Group by County
  const groupedByCounty = data.reduce((countyAcc, row) => {
    // Find or create the county group
    let countyGroup = countyAcc.find((c) => c.name === row.County);
    if (!countyGroup) {
      countyGroup = { name: row.County, children: [] };
      countyAcc.push(countyGroup);
    }

    // Find or create the type group within the county
    let typeGroup = countyGroup.children.find((t) => t.name === row.Type);
    if (!typeGroup) {
      typeGroup = { name: row.Type, children: [] };
      countyGroup.children.push(typeGroup);
    }

    // Add the bedroom and price information as children
    typeGroup.children.push({
      name: `${row.Bedrooms} Bedroom${row.Bedrooms > 1 ? "s" : ""}`,
      size: parseInt(row.Price_sales), // You can toggle between Price_sales or Price_rent here
    });

    return countyAcc;
  }, []);

  return groupedByCounty;
}
const rentalData = [
  { County: "Kajiado", Type: "House", Price: 60000.0 },
  { County: "Kajiado", Type: "Townhouse", Price: 85000.0 },
  { County: "Kajiado", Type: "Villa", Price: 40000.0 },
  { County: "Kiambu", Type: "House", Price: 194150.0 },
  { County: "Kiambu", Type: "Townhouse", Price: 193783.33333 },
  { County: "Kiambu", Type: "Villa", Price: 286875.0 },
  { County: "Kilifi", Type: "House", Price: 190833.335 },
  { County: "Kilifi", Type: "Townhouse", Price: 160875.0 },
  { County: "Kilifi", Type: "Villa", Price: 106875.0 },
  { County: "Kwale", Type: "House", Price: 150000.0 },
  { County: "Kwale", Type: "Villa", Price: 30000.0 },
  { County: "Laikipia", Type: "House", Price: 85833.335 },
  { County: "Machakos", Type: "House", Price: 109666.666667 },
  { County: "Machakos", Type: "Townhouse", Price: 127500.0 },
  { County: "Mombasa", Type: "House", Price: 197097.62 },
  { County: "Mombasa", Type: "Townhouse", Price: 104652.776667 },
  { County: "Mombasa", Type: "Villa", Price: 132682.54 },
  { County: "Nairobi", Type: "House", Price: 471935.767 },
  { County: "Nairobi", Type: "Townhouse", Price: 381737.821667 },
  { County: "Nairobi", Type: "Villa", Price: 430822.398 },
  { County: "Nakuru", Type: "House", Price: 72500.0 },
];
// Sample data: Reshaped into flattened structure
const saleData = [
  { County: "Kajiado", Type: "House", Price: 18761705.28 },
  { County: "Kajiado", Type: "Townhouse", Price: 13280252.10 },
  { County: "Kajiado", Type: "Villa", Price: 11283333.33 },
  { County: "Kiambu", Type: "House", Price: 18830913.07 },
  { County: "Kiambu", Type: "Townhouse", Price: 18006260.82 },
  { County: "Kiambu", Type: "Villa", Price: 35513095.24 },
  { County: "Kilifi", Type: "House", Price: 58824488.20 },
  { County: "Kilifi", Type: "Townhouse", Price: 13782592.59 },
  { County: "Kilifi", Type: "Villa", Price: 46115530.30 },
  { County: "Mombasa", Type: "House", Price: 64169928.30 },
  { County: "Mombasa", Type: "Townhouse", Price: 37328462.96 },
  { County: "Mombasa", Type: "Villa", Price: 60586789.56 },
  { County: "Nairobi", Type: "House", Price: 126227595.92 },
  { County: "Nairobi", Type: "Townhouse", Price: 87758544.51 },
  { County: "Nairobi", Type: "Villa", Price: 140704930.40 },
];


const Dashboard = () => {
  const [csvData, setCsvData] = useState([]);
    useEffect(() => {
        // Path to the CSV file
        const fetchData = async () => {
          try {
            const response = await fetch("/data/merged_data.csv"); // Use the correct path to your CSV file
            const csvText = await response.text();
    
            // Parse the CSV data
            Papa.parse(csvText, {
              header: true, // Converts rows to JSON objects using the first row as field names
              skipEmptyLines: true,
              complete: (results) => {
                setCsvData(results.data); // Set parsed data to state
              },
            });
          } catch (error) {
            console.error("Error fetching or parsing CSV file:", error);
          }
        };
    
        fetchData();
      }, []);
  // Sample data




  // Filters state
  const [selectedCounty, setSelectedCounty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
console.log(transformData(csvData))
  return (
    <div style={{ padding: "20px",width:'100%', fontFamily: "Arial, sans-serif" }}>
      <h3>Real Estate Dashboard</h3>

      {/* Filters */}
      {/* <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>
          Filter by County:
          <select
            style={{ marginLeft: "10px" }}
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Nairobi">Nairobi</option>
            <option value="Kiambu">Kiambu</option>
            <option value="Mombasa">Mombasa</option>
          </select>
        </label>

        <label style={{ marginRight: "10px" }}>
          Filter by Type:
          <select
            style={{ marginLeft: "10px" }}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
          </select>
        </label>
      </div> */}
      {/* <h2>Housing Price Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={housingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Nairobi" stroke="#8884d8" />
          <Line type="monotone" dataKey="Kiambu" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Mombasa" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width="100%" height={300}>
      {/* <Example data={transformData(csvData)}/> */}
      <Heatmap/>
      </ResponsiveContainer>
      <RentalInvestmentScatter/>
    </div>
  );
};

export default Dashboard;
