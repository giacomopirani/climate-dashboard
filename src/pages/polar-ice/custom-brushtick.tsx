import React from "react";

interface CustomBrushTickProps {
  x: number;
  y: number;
  payload: { value: string };
}

const CustomBrushTick: React.FC<CustomBrushTickProps> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x}, ${y + 10})`}>
      <text x={0} y={0} textAnchor="middle" fill="#666" fontSize={12}>
        {payload.value}
      </text>
    </g>
  );
};

export default CustomBrushTick;
