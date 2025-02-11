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
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import LoadingSpinner from "../../util/loading-spinner";
import CustomTooltip from "../tooltip/custom-tooltip";
import { MethaneMonthYearModal } from "./methane-month-year-modal";

const Methane = () => {
  const [data, setData] = useState<MethaneData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getMethane();
        const formattedData = result.methane.map((item: any) => ({
          date: formatDate(item.date),
          average: parseFloat(item.average),
          trend: parseFloat(item.trend),
          averageUnc: parseFloat(item.averageUnc),
          trendUnc: parseFloat(item.trendUnc),
        }));
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

  const defaultMonth = new Date();
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(defaultMonth);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const startDate = selectedMonth
    ? new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1)
    : null;
  const endDate = selectedMonth
    ? new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 12, 0)
    : null;

  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return data;
    return data.filter(({ date }) => {
      const d = new Date(date);
      return d >= startDate && d <= endDate;
    });
  }, [data, startDate, endDate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold">Methane Levels</h1>

      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          onClick={() => setShowMonthPicker(true)}
        >
          <Calendar size={20} />
          Select Month & Year
        </button>
      </div>

      {selectedMonth && startDate && endDate && (
        <div className="text-center text-gray-700">
          <p className="font-bold">
            Selected range:{" "}
            <span className="font-semibold text-orange-500">
              {selectedMonth.toLocaleDateString("it-IT", {
                month: "long",
                year: "numeric",
              })}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-orange-500">
              {endDate.toLocaleDateString("it-IT", {
                month: "long",
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
            Atmospheric methane concentration over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#8884d8"
                name="Average"
              />
              <Line
                type="monotone"
                dataKey="trend"
                stroke="#82ca9d"
                name="Trend"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Methane;
