import React from "react";
import { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
  unit?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  unit = "ppb",
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white/90 border border-gray-300 p-3 rounded-lg shadow-md">
      <p className="text-sm font-bold text-black mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-xs" style={{ color: entry.color }}>
          {entry.name}:{" "}
          <strong>
            {entry.value} {unit}
          </strong>
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
