import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/util/loading-spinner";
import { Calendar } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTemperatureData } from "../../hooks/use-temperature-data";
import TemperatureChart from "./temperature-chart";
import { TemperatureYearRangeModal } from "./temperature-year-range-modal";

const Temperature: React.FC = () => {
  const MAX_ALLOWED_YEAR = 2024;

  const currentYear = new Date().getFullYear();
  const defaultEndYear =
    currentYear > MAX_ALLOWED_YEAR ? MAX_ALLOWED_YEAR : currentYear;

  const defaultStart = new Date(defaultEndYear - 9, 0, 1);
  const defaultEnd = new Date(defaultEndYear, 11, 31);
  const defaultRange: [Date | null, Date | null] = [defaultStart, defaultEnd];

  const [yearRange, setYearRange] =
    useState<[Date | null, Date | null]>(defaultRange);
  const [startYear, endYear] = yearRange;

  const [showYearPicker, setShowYearPicker] = useState(false);

  const { data, isLoading, error } = useTemperatureData();

  const filteredData = useMemo(() => {
    return data.filter(({ time }) => {
      const d = new Date(time);
      const year = d.getFullYear();
      const start = startYear ? startYear.getFullYear() : -Infinity;
      const end = endYear ? endYear.getFullYear() : Infinity;
      return year >= start && year <= end;
    });
  }, [data, startYear, endYear]);

  const numYears =
    startYear && endYear
      ? endYear.getFullYear() - startYear.getFullYear() + 1
      : 0;

  if (startYear && endYear && startYear > endYear) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
          Start year cannot be later than end year.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="space-y-6 mt-6 relative">
      <h1 className="text-3xl font-bold text-center">
        Global Temperature Trends
      </h1>

      <div className="flex justify-center">
        <button
          onClick={() => setShowYearPicker(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
        >
          <Calendar size={20} />
          Select Year range
        </button>
      </div>

      {startYear && endYear && (
        <div className="text-center text-gray-700">
          <p className="font-bold">
            Selected range:{" "}
            <span className="font-semibold text-orange-500">
              {startYear.getFullYear()}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-orange-500">
              {endYear.getFullYear()}
            </span>
          </p>
          <p className="text-green-700">
            {numYears} {numYears === 1 ? "year" : "years"} selected
          </p>
        </div>
      )}

      {showYearPicker && (
        <TemperatureYearRangeModal
          startYear={startYear}
          endYear={endYear}
          setYearRange={setYearRange}
          onClose={() => setShowYearPicker(false)}
          defaultRange={defaultRange}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Temperature Anomalies</CardTitle>
          <CardDescription>
            Global land-surface air temperature anomalies relative to the
            1951-1980 average.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemperatureChart data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Temperature;
