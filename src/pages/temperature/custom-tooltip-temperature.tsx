const CustomTooltipTemperature = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const labelValue = label ?? "";
    return (
      <div className="bg-white border p-2 shadow rounded">
        <p className="font-bold text-sm">
          Anno: {labelValue ? parseFloat(labelValue).toFixed(0) : "N/A"}
        </p>
        <p className="text-xs">
          Station: <strong>{payload[0]?.value}</strong>
        </p>
        <p className="text-xs">
          Land: <strong>{payload[1]?.value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltipTemperature;
