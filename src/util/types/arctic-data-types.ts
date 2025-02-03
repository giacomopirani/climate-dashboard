export interface ArcticDataDescription {
  title: string;
  basePeriod: string;
  units: string;
  annualMean: number;
  decadalTrend: number;
  missing: number;
}

export interface ArcticMonthlyData {
  value: number;
  anom: number;
  monthlyMean: number;
}

export interface ArcticDataPayload {
  description: ArcticDataDescription;
  data: {
    [date: string]: ArcticMonthlyData;
  };
}

export interface ArcticDataResponse {
  error: any;
  arcticData: ArcticDataPayload;
}
