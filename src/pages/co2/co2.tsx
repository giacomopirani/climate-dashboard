import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/util/loading-spinner";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCO2Data } from "../../hooks/use-co2-data";
import CustomTooltip from "../tooltip/custom-tooltip";

const CO2 = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const { data, isLoading, error } = useCO2Data();

  const filteredData = useMemo(
    () =>
      data.filter(({ date }) => {
        const d = new Date(date);
        return (!startDate || d >= startDate) && (!endDate || d <= endDate);
      }),
    [data, startDate, endDate]
  );

  if (startDate && endDate && startDate > endDate) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
          La data di inizio non può essere successiva alla data di fine.
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

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold">CO2 Levels</h1>
      <div className="flex gap-4 items-center">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Start date:
          </label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={setStartDate}
            className="border p-2 rounded w-full"
            placeholderText="Select the start date"
            withPortal
            calendarClassName="custom-calendar"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            End date:
          </label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={setEndDate}
            className="border p-2 rounded w-full"
            placeholderText="Select the end date"
            withPortal
            popperPlacement="bottom-end"
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center text-gray-500">
          Nessun dato disponibile per questo intervallo.
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>CO2 Concentration</CardTitle>
            <CardDescription>
              Atmospheric CO2 concentration over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={filteredData}>
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
                  tickFormatter={(tick) => tick.toLocaleString()}
                  tick={{ fill: "#555", fontSize: 12 }}
                />
                <Tooltip content={CustomTooltip} />
                <Legend verticalAlign="top" height={36} />
                <Bar
                  dataKey="trend"
                  fill="#8884d8"
                  name="Trend"
                  animationDuration={800}
                  barSize={35}
                />
                <Bar
                  dataKey="cycle"
                  fill="#82ca9d"
                  name="Cycle"
                  animationDuration={800}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CO2;
