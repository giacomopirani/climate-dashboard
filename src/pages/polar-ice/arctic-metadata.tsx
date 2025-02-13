import React from "react";
import { ArcticDataDescription } from "../../util/types/arctic-data-types";

interface ArcticMetaDataProps {
  description: ArcticDataDescription;
}

const ArcticMetaData: React.FC<ArcticMetaDataProps> = ({ description }) => (
  <div className="mb-4">
    <p>
      <strong className="text-indigo-500">Base Period:</strong>{" "}
      {description.basePeriod}
    </p>
    <p>
      <strong className="text-indigo-500">Units:</strong> {description.units}
    </p>
    <p>
      <strong className="text-indigo-500">Annual Mean:</strong>{" "}
      {description.annualMean}
    </p>
    <p>
      <strong className="text-indigo-500">Decadal Trend:</strong>{" "}
      {description.decadalTrend}
    </p>
  </div>
);

export default ArcticMetaData;
