import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
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

interface TemperatureData {
  time: string;
  station: number;
  land: number;
}

const Temperature = () => {
  const [data, setData] = useState<TemperatureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getTemperature();
        const formattedData = result.result.map((item: any) => ({
          time: item.time,
          station: parseFloat(item.station),
          land: parseFloat(item.land),
        }));
        setData(formattedData);
      } catch (err) {
        setError("Failed to load temperature data");
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
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Temperature Trends</h1>
      <Card>
        <CardHeader>
          <CardTitle>Temperature Anomalies</CardTitle>
          <CardDescription>
            Global land-surface air temperature anomalies relative to the
            1951-1980 average
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="station"
                stroke="#8884d8"
                name="Station"
              />
              <Line
                type="monotone"
                dataKey="land"
                stroke="#82ca9d"
                name="Land"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Temperature;
