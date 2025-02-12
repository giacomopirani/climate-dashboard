import { TemperatureData } from "@/util/types/temperature-types";
import React from "react";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import CustomTooltip from "../tooltip/custom-tooltip-temperature";

interface TemperatureChartProps {
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const stationValues = data.map((d) => d.station);
  const landValues = data.map((d) => d.land);
  const overallMin = Math.min(...stationValues, ...landValues);
  const overallMax = Math.max(...stationValues, ...landValues);
  const offset = (overallMax - overallMin) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: -25, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(time) => `${new Date(time).getFullYear()}`}
          minTickGap={10}
          tickMargin={10}
        />
        <YAxis
          domain={[overallMin - offset, overallMax + offset]}
          tickFormatter={(tick) => Math.trunc(tick).toLocaleString()}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" align="center" />

        <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />

        <Line
          type="monotone"
          dataKey="station"
          name="Station"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />

        <Line
          type="monotone"
          dataKey="land"
          name="Land"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />

        <Brush
          dataKey="time"
          height={50}
          stroke="#8884d8"
          travellerWidth={15}
          tickFormatter={(time) => `${new Date(time).getFullYear()}`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
