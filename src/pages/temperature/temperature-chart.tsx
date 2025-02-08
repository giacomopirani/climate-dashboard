import React, { useState } from "react";
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
import { formatDate } from "../../util/format-date";
import { TemperatureData } from "../../util/types/temperature-types";
import TemperatureTooltip from "./custom-tooltip-temperature";

interface TemperatureChartProps {
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const [highlightedPoint, setHighlightedPoint] = useState<string | null>(null);

  return (
    <ResponsiveContainer
      width="100%"
      height={window.innerWidth < 768 ? 300 : 400}
    >
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        onMouseMove={(e) => setHighlightedPoint(e?.activeLabel ?? null)}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
        <XAxis
          dataKey="time"
          tickFormatter={formatDate}
          tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
        />
        <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
        <Tooltip content={<TemperatureTooltip />} />
        <Legend verticalAlign="top" height={36} />

        <Line
          type="monotone"
          dataKey="station"
          stroke="#6a5acd"
          strokeWidth={2.5}
          name="Station"
          activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
          dot={{ r: 3, fill: "#6a5acd", stroke: "white", strokeWidth: 1 }}
          animationDuration={600}
        />

        <Line
          type="monotone"
          dataKey="land"
          stroke="#32cd32"
          strokeWidth={2.5}
          name="Land"
          activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
          dot={{ r: 3, fill: "#32cd32", stroke: "white", strokeWidth: 1 }}
          animationDuration={600}
        />
        {highlightedPoint && (
          <ReferenceLine
            x={highlightedPoint}
            stroke="red"
            strokeDasharray="3 3"
            label="Focus"
          />
        )}
        <Brush dataKey="time" height={20} stroke="#ff4500" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
