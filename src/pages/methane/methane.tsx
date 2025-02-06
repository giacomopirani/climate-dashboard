import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { MethaneData } from "@/util/types/methane-types";
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
import formatData from "../../util/format-data";
import LoadingSpinner from "../../util/loading-spinner";

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
          date: item.date,
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
      <Card>
        <CardHeader>
          <CardTitle>Methane Concentration</CardTitle>
          <CardDescription>
            Atmospheric methane concentration over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatData} />
              <YAxis />
              <Tooltip />
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

export default Methane;
