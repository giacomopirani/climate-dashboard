import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatDate } from "@/util/format-date";
import { MethaneData } from "@/util/types/methane-types";
import { Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ErrorBar,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingSpinner from "../../util/loading-spinner";
import CustomTooltip from "../tooltip/custom-tooltip";
import { MethaneMonthYearModal } from "./methane-month-year-modal";

interface ExtendedMethaneData extends MethaneData {
  dateObj: Date;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}

interface ChartData {
  date: string;
  average: number;
  trend: number;
  averageUnc: number;
  trendUnc: number;
}

const generateChartData = (
  start: Date,
  end: Date,
  data: ExtendedMethaneData[]
): ChartData[] => {
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  const result: ChartData[] = [];
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
    if (record) {
      result.push({
        date: label,
        average: record.average,
        trend: record.trend,
        averageUnc: record.averageUnc,
        trendUnc: record.trendUnc,
      });
    } else {
      result.push({
        date: label,
        average: 0,
        trend: 0,
        averageUnc: 0,
        trendUnc: 0,
      });
    }
  }
  return result;
};

const Methane = () => {
  const [data, setData] = useState<ExtendedMethaneData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getMethane();
        const formattedData: ExtendedMethaneData[] = result.methane.map(
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
        setError("Failed to load methane data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const defaultMonth = new Date(2023, 9, 1);
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

  const { yMin, yMax, offset } = useMemo(() => {
    const allValues = chartData.flatMap((item) => [item.average, item.trend]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const off = (max - min) * 0.1;
    return { yMin: min, yMax: max, offset: off };
  }, [chartData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold flex justify-center">Methane Levels</h1>
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          onClick={() => setShowMonthPicker(true)}
        >
          <Calendar size={20} />
          Select Month &amp; Year
        </button>
      </div>
      {selectedMonth && startDate && endDate && (
        <div className="text-center text-gray-700">
          <p className="font-bold">
            Selected range:{" "}
            <span className="font-semibold text-orange-500">
              {selectedMonth.toLocaleDateString("en-En", {
                month: "short",
                year: "numeric",
              })}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-orange-500">
              {endDate.toLocaleDateString("en-En", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </p>
          <p className="text-green-700">12 months selected</p>
        </div>
      )}
      {showMonthPicker && (
        <MethaneMonthYearModal
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          onClose={() => setShowMonthPicker(false)}
          defaultMonth={defaultMonth}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>Methane Concentration</CardTitle>
          <CardDescription>
            Atmospheric methane concentration over time (12-month period)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 60 }}
            >
              <defs>
                <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" interval="preserveStartEnd" />
              <YAxis
                domain={[yMin - offset, yMax + offset]}
                tickFormatter={(tick) => Math.trunc(tick).toLocaleString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="average" name="Average" barSize={20} fill="#A15BE4">
                <ErrorBar dataKey="averageUnc" stroke="#ff7300" width={4} />
              </Bar>
              <Line
                dataKey="trend"
                name="Trend"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ fill: "#82ca9d", stroke: "#fff", r: 3 }}
              >
                <ErrorBar dataKey="trendUnc" stroke="#ff7300" width={4} />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Methane;
