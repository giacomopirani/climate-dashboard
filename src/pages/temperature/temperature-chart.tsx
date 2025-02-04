import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import formatTime from "../../util/format-time";
import { TemperatureData } from "../../util/types/temperature-types";
import TemperatureTooltip from "./custom-tooltip-temperature";

interface TemperatureChartProps {
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={formatTime}
          tick={{ fontSize: 12 }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<TemperatureTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="station"
          stroke="#8884d8"
          name="Station"
          activeDot={{ r: 6 }}
          dot={{ r: 3 }}
          animationDuration={800}
        />
        <Line
          type="monotone"
          dataKey="land"
          stroke="#82ca9d"
          name="Land"
          activeDot={{ r: 6 }}
          dot={{ r: 3 }}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
