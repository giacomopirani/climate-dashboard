import React from "react";
import { TooltipProps } from "recharts";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "black",
          marginBottom: "5px",
        }}
      >
        {label}
      </p>

      {payload.map((entry, index) => (
        <p
          key={index}
          style={{ fontSize: "13px", margin: "5px 0", color: entry.color }}
        >
          {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default CustomTooltip;
