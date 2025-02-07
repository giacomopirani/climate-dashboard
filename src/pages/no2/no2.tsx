import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import LoadingSpinner from "@/util/loading-spinner";
import { NO2Data } from "@/util/types/no2-types";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "../../util/format-date";
import CustomTooltip from "../tooltip/custom-tooltip";

const NO2 = () => {
  const [data, setData] = useState<NO2Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getNO2();
        if (!result?.nitrous) {
          throw new Error("Data not available");
        }

        const formattedData = result.nitrous.map((item: any) => ({
          date: formatDate(item.date),
          average: parseFloat(item.average),
          trend: parseFloat(item.trend),
          averageUnc: parseFloat(item.averageUnc),
          trendUnc: parseFloat(item.trendUnc),
        }));
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
      <h1 className="text-3xl font-bold text-center">NO₂ Levels</h1>
      <Card>
        <CardHeader>
          <CardTitle>NO₂ Concentration</CardTitle>
          <CardDescription>
            Atmospheric nitrous oxide concentration over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
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
              <Line
                type="monotone"
                dataKey="averageUnc"
                stroke="#ff7300"
                name="Average Uncertainty"
                dot={false}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="trendUnc"
                stroke="#ff0000"
                name="Trend Uncertainty"
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default NO2;
