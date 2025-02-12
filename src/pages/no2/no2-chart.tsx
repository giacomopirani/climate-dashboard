import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../tooltip/custom-tooltip";

interface NO2ChartData {
  date: string;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}

interface NO2ChartProps {
  data: NO2ChartData[];
}

const NO2Chart: React.FC<NO2ChartProps> = ({ data }) => {
  const values = data.flatMap((item) => [item.average, item.trend]);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const offset = (maxVal - minVal) * 0.1;

  return (
    <ResponsiveContainer width="99%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 40, right: 30, left: -10, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" interval="preserveStartEnd" />
        <YAxis
          domain={[minVal - offset, maxVal + offset]}
          tickFormatter={(tick) => Math.trunc(tick).toLocaleString()}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" align="center" />

        <Line
          type="monotone"
          dataKey="average"
          name="Average"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        ></Line>

        <Line
          type="monotone"
          dataKey="trend"
          name="Trend"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        ></Line>
        <Brush
          dataKey="date"
          height={50}
          stroke="#8884d8"
          travellerWidth={15}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NO2Chart;
