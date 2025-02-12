import React from "react";
import {
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
import { formatPolarIceDate } from "../../util/format-date";
import CustomTooltip from "./custom-tooltip-polar-ice";

export interface ArcticChartData {
  dateObj: Date;
  month: string;
  value: number;
  anomaly: number;
}

export interface ExtendedArcticChartData extends ArcticChartData {
  dateObj: Date;
}

interface ArcticChartProps {
  data: ArcticChartData[];
  annualMean: number;
}

const ArcticChart: React.FC<ArcticChartProps> = ({ data, annualMean }) => {
  const formattedData = data.map((item) => ({
    ...item,
    month: formatPolarIceDate(item.month),
  }));

  return (
    <div>
      <ResponsiveContainer width="99%" height={400}>
        <LineChart
          data={formattedData}
          margin={{ top: 30, right: 20, left: -20, bottom: 40 }}
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
          <ReferenceLine y={annualMean} stroke="red" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArcticChart;
