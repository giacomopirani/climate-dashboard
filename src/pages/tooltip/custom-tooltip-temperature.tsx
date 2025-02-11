import React from "react";

interface CustomTooltipTemperatureProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltipTemperature: React.FC<CustomTooltipTemperatureProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    const labelValue = label ?? "";
    return (
      <div className="bg-white border p-2 shadow rounded">
        <p className="font-bold text-orange-600">
          Year: {labelValue ? parseFloat(labelValue).toFixed(0) : "N/A"}
        </p>
        <p className="text-xs text-black">
          Station: <strong>{payload[0]?.value} °C</strong>
        </p>
        <p className="text-xs text-black">
          Land: <strong>{payload[1]?.value} °C</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltipTemperature;
