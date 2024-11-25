import { Treemap, ResponsiveContainer } from 'recharts'
import Papa from "papaparse";
import { PureComponent, useEffect, useState } from 'react';

const data1 = [
    {
      name: 'axis',
      children: [
        { name: 'Axes', size: 1302 },
        { name: 'Axis', size: 24593 },
        { name: 'AxisGridLine', size: 652 },
        { name: 'AxisLabel', size: 636 },
        { name: 'CartesianAxes', size: 6703 },
      ],
    },
    {
      name: 'controls',
      children: [
        { name: 'AnchorControl', size: 2138 },
        { name: 'ClickControl', size: 3824 },
        { name: 'Control', size: 1353 },
        { name: 'ControlList', size: 4665 },
        { name: 'DragControl', size: 2649 },
        { name: 'ExpandControl', size: 2832 },
        { name: 'HoverControl', size: 4896 },
        { name: 'IControl', size: 763 },
        { name: 'PanZoomControl', size: 5222 },
        { name: 'SelectionControl', size: 7862 },
        { name: 'TooltipControl', size: 8435 },
      ],
    },
    {
      name: 'data',
      children: [
        { name: 'Data', size: 20544 },
        { name: 'DataList', size: 19788 },
        { name: 'DataSprite', size: 10349 },
        { name: 'EdgeSprite', size: 3301 },
        { name: 'NodeSprite', size: 19382 },
        {
          name: 'render',
          children: [
            { name: 'ArrowType', size: 698 },
            { name: 'EdgeRenderer', size: 5569 },
            { name: 'IRenderer', size: 353 },
            { name: 'ShapeRenderer', size: 2247 },
          ],
        },
        { name: 'ScaleBinding', size: 11275 },
        { name: 'Tree', size: 7147 },
        { name: 'TreeBuilder', size: 9930 },
      ],
    },
    {
      name: 'events',
      children: [
        { name: 'DataEvent', size: 7313 },
        { name: 'SelectionEvent', size: 6880 },
        { name: 'TooltipEvent', size: 3701 },
        { name: 'VisualizationEvent', size: 2117 },
      ],
    },
    {
      name: 'legend',
      children: [
        { name: 'Legend', size: 20859 },
        { name: 'LegendItem', size: 4614 },
        { name: 'LegendRange', size: 10530 },
      ],
    },
    {
      name: 'operator',
      children: [
        {
          name: 'distortion',
          children: [
            { name: 'BifocalDistortion', size: 4461 },
            { name: 'Distortion', size: 6314 },
            { name: 'FisheyeDistortion', size: 3444 },
          ],
        },
        {
          name: 'encoder',
          children: [
            { name: 'ColorEncoder', size: 3179 },
            { name: 'Encoder', size: 4060 },
            { name: 'PropertyEncoder', size: 4138 },
            { name: 'ShapeEncoder', size: 1690 },
            { name: 'SizeEncoder', size: 1830 },
          ],
        },
        {
          name: 'filter',
          children: [
            { name: 'FisheyeTreeFilter', size: 5219 },
            { name: 'GraphDistanceFilter', size: 3165 },
            { name: 'VisibilityFilter', size: 3509 },
          ],
        },
        { name: 'IOperator', size: 1286 },
        {
          name: 'label',
          children: [
            { name: 'Labeler', size: 9956 },
            { name: 'RadialLabeler', size: 3899 },
            { name: 'StackedAreaLabeler', size: 3202 },
          ],
        },
        {
          name: 'layout',
          children: [
            { name: 'AxisLayout', size: 6725 },
            { name: 'BundledEdgeRouter', size: 3727 },
            { name: 'CircleLayout', size: 9317 },
            { name: 'CirclePackingLayout', size: 12003 },
            { name: 'DendrogramLayout', size: 4853 },
            { name: 'ForceDirectedLayout', size: 8411 },
            { name: 'IcicleTreeLayout', size: 4864 },
            { name: 'IndentedTreeLayout', size: 3174 },
            { name: 'Layout', size: 7881 },
            { name: 'NodeLinkTreeLayout', size: 12870 },
            { name: 'PieLayout', size: 2728 },
            { name: 'RadialTreeLayout', size: 12348 },
            { name: 'RandomLayout', size: 870 },
            { name: 'StackedAreaLayout', size: 9121 },
            { name: 'TreeMapLayout', size: 9191 },
          ],
        },
        { name: 'Operator', size: 2490 },
        { name: 'OperatorList', size: 5248 },
        { name: 'OperatorSequence', size: 4190 },
        { name: 'OperatorSwitch', size: 2581 },
        { name: 'SortOperator', size: 2023 },
      ],
    },
  ];
  
  const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];
  
  const colorArray = [
    "#FF5733", // Red-Orange
    "#33FF57", // Green
    "#3357FF", // Blue
    "#FF33A1", // Pink
    "#FFC300", // Yellow
    "#8D33FF", // Purple
    "#33FFF5", // Cyan
    "#FF8C33", // Orange
    "#75FF33"  // Lime
  ];
  
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
// Customized content for the TreeMap
const CustomizedContent2 = ({
    root,
    depth,
    x,
    y,
    width,
    height,
    index,
    colors,
    name,
  }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : '#ffffff00',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
            >
              {name}
            </text>
            <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
              {index + 1}
            </text>
          </>
        )}
      </g>
    );
  };

function CountiesSaleRent() {
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
      const transformedData = transformData(csvData);
    console.log(transformedData)
    return (
        <Treemap
        width={400}
          height={200}
          data={transformedData}
          dataKey="size"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent2 colors={COLORS} />}
        />
      );
}

export default CountiesSaleRent



class CustomizedContent extends PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

export function Example({data}){
    return (
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            width={500}
            height={200}
            data={data}
            dataKey="size"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={colorArray} />}
          />
        </ResponsiveContainer>
      );
}
