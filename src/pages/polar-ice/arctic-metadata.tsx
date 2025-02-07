import React from "react";
import { ArcticDataDescription } from "../../util/types/arctic-data-types";

interface ArcticMetaDataProps {
  description: ArcticDataDescription;
}

const ArcticMetaData: React.FC<ArcticMetaDataProps> = ({ description }) => (
  <div className="mb-4">
    <p>
      <strong>Base Period:</strong> {description.basePeriod}
    </p>
    <p>
      <strong>Units:</strong> {description.units}
    </p>
    <p>
      <strong>Annual Mean:</strong> {description.annualMean}
    </p>
    <p>
      <strong>Decadal Trend:</strong> {description.decadalTrend}
    </p>
  </div>
);

export default ArcticMetaData;
