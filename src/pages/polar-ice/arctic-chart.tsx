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
import { formatPolarIceDate } from "../../util/format-date";
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
  const formattedData = data.map((item) => ({
    ...item,
    month: formatPolarIceDate(item.month),
  }));

  const [showBrushMessage, setShowBrushMessage] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      {showBrushMessage && (
        <div
          style={{
            position: "absolute",
            bottom: 55,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "5px 10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
            fontSize: "14px",
            zIndex: 10,
          }}
        >
          Select a range by dragging the Brush
        </div>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={formattedData}
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
            height={50}
            stroke="#ff4500"
            fill="rgba(255, 69, 0, 0.1)"
            onChange={() => setShowBrushMessage(false)}
            {...({ tick: CustomBrushTick } as any)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ArcticChart;
