import React, { useState } from "react";
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
import { useWindowSize } from "../../hooks/use-window-size";
import { convertTimeStringToYear } from "../../util/format-date";
import { TemperatureData } from "../../util/types/temperature-types";
import CustomTooltipTemperature from "../tooltip/custom-tooltip-temperature";

interface TemperatureChartProps {
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { width } = useWindowSize();
  const chartHeight = width < 768 ? 300 : 400;
  const [highlightedPoint, setHighlightedPoint] = useState<string | null>(null);

  return (
    <ResponsiveContainer
      width="100%"
      height={chartHeight}
      className="min-h-[300px]"
    >
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        onMouseMove={(e) => setHighlightedPoint(e?.activeLabel ?? null)}
      >
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
        <XAxis
          dataKey="time"
          tickFormatter={(timeStr: string) => convertTimeStringToYear(timeStr)}
          tick={{ fontSize: width < 768 ? 10 : 12 }}
          interval="preserveStartEnd"
        />
        <YAxis tick={{ fontSize: width < 768 ? 10 : 12 }} />
        <Tooltip content={<CustomTooltipTemperature />} />
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
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
