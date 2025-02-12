import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import LoadingSpinner from "@/util/loading-spinner";
import {
  ArcticDataDescription,
  ArcticDataResponse,
  ArcticMonthlyData,
} from "@/util/types/arctic-data-types";
import { Calendar } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { formatPolarIceDate } from "../../util/format-date";
import ArcticChart, {
  ArcticChartData,
  ExtendedArcticChartData,
} from "./arctic-chart";
import ArcticMetaData from "./arctic-metadata";
import { PolarIceDateModal } from "./polar-ice-date-modal";

const formatArcticData = (rawData: {
  [date: string]: ArcticMonthlyData;
}): ExtendedArcticChartData[] => {
  return Object.entries(rawData).map(([key, data]) => {
    const year = parseInt(key.slice(0, 4), 10);
    const month = parseInt(key.slice(4), 10) - 1;
    const dateObj = new Date(year, month, 1);
    console.log(`Parsed ${key} into date:`, dateObj);
    return {
      month: formatPolarIceDate(key),
      value: data.value,
      anomaly: data.anom,
      dateObj,
    };
  });
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

  const defaultMonth = new Date(2024, 0, 1);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(defaultMonth);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const filteredChartData = useMemo(() => {
    if (!selectedMonth) return chartData;
    const startDate = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth(),
      1
    );
    const endDate = new Date(
      selectedMonth.getFullYear() + 1,
      selectedMonth.getMonth(),
      1
    );
    return chartData.filter((item) => {
      return item.dateObj >= startDate && item.dateObj < endDate;
    });
  }, [chartData, selectedMonth]);

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
      <h1 className="text-3xl font-bold items-center">
        {metaData ? metaData.title : "Arctic Sea Ice Extent"}
      </h1>
      {metaData && <ArcticMetaData description={metaData} />}

      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          onClick={() => setShowMonthPicker(true)}
        >
          <Calendar size={20} />
          Select Month & Year
        </button>
      </div>

      {selectedMonth && (
        <div className="text-center text-gray-700">
          <p className="font-bold">
            Selected range:{" "}
            <span className="font-semibold text-orange-500">
              {selectedMonth.toLocaleDateString("en-EN", {
                month: "short",
                year: "numeric",
              })}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-orange-500">
              {new Date(
                selectedMonth.getFullYear() + 1,
                selectedMonth.getMonth(),
                0
              ).toLocaleDateString("en-EN", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-green-700">12 months selected</p>
        </div>
      )}

      {showMonthPicker && (
        <PolarIceDateModal
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onClose={() => setShowMonthPicker(false)}
          defaultMonth={defaultMonth}
        />
      )}

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
            <ArcticChart
              data={filteredChartData}
              annualMean={metaData.annualMean}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolarIce;
