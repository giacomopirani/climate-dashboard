import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatDate } from "@/util/format-date";
import LoadingSpinner from "@/util/loading-spinner";
import { NO2Data } from "@/util/types/no2-types";
import { Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import NO2Chart from "./no2-chart";

import { NO2MonthYearModal } from "./no2-month-year-modal";

interface ExtendedNO2Data extends NO2Data {
  dateObj: Date;
}

const generateChartData = (
  start: Date,
  end: Date,
  data: ExtendedNO2Data[]
): Array<{
  date: string;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}> => {
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  const result = [];
  for (let i = 0; i < totalMonths; i++) {
    const current = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const label = formatDate(
      `${current.getFullYear()}.${current.getMonth() + 1}`
    );
    const record = data.find(
      (d) =>
        d.dateObj.getFullYear() === current.getFullYear() &&
        d.dateObj.getMonth() === current.getMonth()
    );
    result.push({
      date: label,
      average: record ? record.average : 0,
      trend: record ? record.trend : 0,
      averageUnc: record ? record.averageUnc : 0,
      trendUnc: record ? record.trendUnc : 0,
    });
  }
  return result;
};

const NO2 = () => {
  const [data, setData] = useState<ExtendedNO2Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getNO2();
        if (!result?.nitrous) throw new Error("Data not available");
        const formattedData: ExtendedNO2Data[] = result.nitrous.map(
          (item: any) => {
            const parts = item.date.split(".");
            const year = Number(parts[0]);
            const month = Number(parts[1]);
            const dateObj = new Date(year, month - 1, 1);
            return {
              date: formatDate(item.date),
              dateObj,
              average: parseFloat(item.average),
              trend: parseFloat(item.trend),
              averageUnc: parseFloat(item.averageUnc),
              trendUnc: parseFloat(item.trendUnc),
            };
          }
        );
        setData(formattedData);
      } catch (err) {
        setError("Error loading NO₂ data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const defaultMonth = new Date(2023, 11, 1);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(defaultMonth);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const startDate = selectedMonth
    ? new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
    : null;
  const endDate = selectedMonth
    ? new Date(selectedMonth.getFullYear() + 1, selectedMonth.getMonth() + 1, 0)
    : null;

  const chartData = useMemo(() => {
    if (!startDate || !endDate) return [];
    return generateChartData(startDate, endDate, data);
  }, [startDate, endDate, data]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center font-semibold">{error}</div>
    );

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold">NO₂ Levels</h1>
      <div className="flex">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          onClick={() => setShowMonthPicker(true)}
        >
          <Calendar size={20} />
          Select Month &amp; Year
        </button>
      </div>
      {selectedMonth && startDate && endDate && (
        <div className="text-gray-700">
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
              {endDate.toLocaleDateString("en-EN", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-green-700">12 months selected</p>
        </div>
      )}
      {showMonthPicker && (
        <NO2MonthYearModal
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onClose={() => setShowMonthPicker(false)}
          defaultMonth={defaultMonth}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>NO₂ Concentration</CardTitle>
          <CardDescription>
            Atmospheric nitrous oxide concentration over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NO2Chart data={chartData} />
        </CardContent>
        <p className="text-center text-sm text-orange-600">
          ← Zoom with Brush →
        </p>
      </Card>
    </div>
  );
};

export default NO2;
