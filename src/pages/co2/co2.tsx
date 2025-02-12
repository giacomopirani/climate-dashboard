import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/util/loading-spinner";
import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCO2Data } from "../../hooks/use-co2-data";
import CustomTooltip from "../tooltip/custom-tooltip";

const CO2 = () => {
  const defaultStart = new Date(new Date().setDate(new Date().getDate() - 7));
  const defaultEnd = new Date();
  const defaultRange: [Date | null, Date | null] = [defaultStart, defaultEnd];

  const [dateRange, setDateRange] =
    useState<[Date | null, Date | null]>(defaultRange);
  const [startDate, endDate] = dateRange;

  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading, error } = useCO2Data();

  const filteredData = useMemo(() => {
    return data.filter(({ date }) => {
      const d = new Date(date);
      return (!startDate || d >= startDate) && (!endDate || d <= endDate);
    });
  }, [data, startDate, endDate]);

  if (startDate && endDate && startDate > endDate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
          The start date cannot be later than the end date.
        </p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  const numDays =
    startDate && endDate
      ? Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      : 0;

  const allValues = filteredData.flatMap((d) => [d.trend, d.cycle]);
  const yMin = Math.min(...allValues);
  const yMax = Math.max(...allValues);
  const offset = (yMax - yMin) * 0.1;

  return (
    <div className="space-y-6 mt-6 relative">
      <h1 className="text-3xl font-bold text-center">CO2 Levels</h1>

      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          onClick={() => setShowCalendar(true)}
        >
          <Calendar size={20} />
          Select Date Range
        </button>
      </div>

      {startDate && endDate && (
        <div className="text-center text-gray-700">
          <p className="font-bold">
            Selected range:{" "}
            <span className="font-semibold text-orange-500">
              {startDate.toLocaleDateString()}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-orange-500">
              {endDate.toLocaleDateString()}
            </span>
          </p>
          <p className="text-green-700">
            {numDays} {numDays === 1 ? "day" : "days"} selected
          </p>
        </div>
      )}

      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md max-h-[80vh] md:rounded-lg overflow-y-auto">
            <header className="flex justify-between items-center px-4 py-3 border-b">
              <h2 className="text-xl font-bold text-black">
                Select Date Range
              </h2>
              <button
                onClick={() => setDateRange(defaultRange)}
                className="text-red-500 hover:text-red-700"
              >
                Reset
              </button>
            </header>

            <main className="p-4 flex justify-center">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update: [Date | null, Date | null]) =>
                  setDateRange(update)
                }
                inline
              />
            </main>

            <footer className="px-4 py-3 border-t">
              <button
                onClick={() => setShowCalendar(false)}
                className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
              >
                Save and Close
              </button>
            </footer>
          </div>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="text-center text-red-700 font-normal mt-8">
          No data available for this range.
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>CO2 Concentration</CardTitle>
            <CardDescription>
              Atmospheric CO2 concentration over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="95%" height={400}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).getFullYear().toString()
                  }
                  interval={30}
                  tick={{ fill: "#555", fontSize: 12 }}
                />
                <YAxis
                  domain={[yMin - offset, yMax + offset]}
                  tickFormatter={(tick) => Math.trunc(tick).toLocaleString()}
                  tick={{ fill: "#555", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip unit="ppm" />} />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="#8884d8"
                  name="Trend"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="cycle"
                  stroke="#82ca9d"
                  name="Cycle"
                  strokeWidth={2}
                  dot={false}
                />

                <Brush
                  dataKey="date"
                  height={50}
                  stroke="#8884d8"
                  travellerWidth={20}
                  fill="rgba(136, 132, 216, 0.2)"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  className="pr-5"
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-sm text-orange-600 mt-2">
              ← Zoom with Brush →
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CO2;
