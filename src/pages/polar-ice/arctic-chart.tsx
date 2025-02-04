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
import CustomBrushTick from "./custom-brushtick";
import CustomTooltip from "./custom-tooltip-polar-ice";

export interface ArcticChartData {
  month: string;
  value: number;
  anomaly: number;
}

interface ArcticChartProps {
  data: ArcticChartData[];
  annualMean: number;
}

const ArcticChart: React.FC<ArcticChartProps> = ({ data, annualMean }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" height={36} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name="Sea Ice Extent"
          activeDot={{ r: 8 }}
          animationDuration={800}
        />
        <Line
          type="monotone"
          dataKey="anomaly"
          stroke="#82ca9d"
          name="Anomaly"
          animationDuration={800}
        />
        <ReferenceLine
          y={annualMean}
          label={`Annual Mean: ${annualMean}`}
          stroke="red"
          strokeDasharray="3 3"
        />
        <Brush
          dataKey="month"
          height={30}
          stroke="#8884d8"
          {...({ tick: CustomBrushTick } as any)}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ArcticChart;
