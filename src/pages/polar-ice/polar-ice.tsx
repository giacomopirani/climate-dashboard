import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import LoadingSpinner from "@/util/loading-spinner";
import React, { useCallback, useEffect, useState } from "react";
import {
  ArcticDataDescription,
  ArcticDataResponse,
  ArcticMonthlyData,
} from "../../util/types/arctic-data-types";
import ArcticChart, { ArcticChartData } from "./arctic-chart";
import ArcticMetaData from "./arctic-metadata";

const formatDateKey = (key: string): string => {
  return `${key.slice(0, 4)}-${key.slice(4)}`;
};

const formatArcticData = (rawData: {
  [date: string]: ArcticMonthlyData;
}): ArcticChartData[] => {
  return Object.entries(rawData).map(([key, data]) => ({
    month: formatDateKey(key),
    value: data.value,
    anomaly: data.anom,
  }));
};

const PolarIce: React.FC = () => {
  const [chartData, setChartData] = useState<ArcticChartData[]>([]);
  const [metaData, setMetaData] = useState<ArcticDataDescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result: ArcticDataResponse = await api.getPolarIce();
      if (result.error) {
        setError("Errore nel recupero dei dati dall'API");
        return;
      }
      const { description, data } = result.arcticData;
      setMetaData(description);
      setChartData(formatArcticData(data));
    } catch (err) {
      setError("Failed to load polar ice data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold">
        {metaData ? metaData.title : "Arctic Sea Ice Extent"}
      </h1>
      {metaData && <ArcticMetaData description={metaData} />}
      <Card>
        <CardHeader>
          <CardTitle>
            {metaData ? metaData.title : "Sea Ice Extent and Anomalies"}
          </CardTitle>
          <CardDescription>
            Monthly Arctic sea ice extent from 1979 onwards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {metaData && (
            <ArcticChart data={chartData} annualMean={metaData.annualMean} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolarIce;
