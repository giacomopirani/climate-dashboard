import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import LoadingSpinner from "@/util/loading-spinner";
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

interface PolarIceData {
  year: number;
  extent: number;
  area: number;
}

const PolarIce = () => {
  const [data, setData] = useState<PolarIceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getPolarIce();
        const formattedData = result.arcticData.map((item: any) => ({
          year: parseInt(item.year),
          extent: parseFloat(item.extent),
          area: parseFloat(item.area),
        }));
        setData(formattedData);
      } catch (err) {
        setError("Failed to load polar ice data");
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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Arctic Sea Ice Extent</h1>
      <Card>
        <CardHeader>
          <CardTitle>Sea Ice Extent and Area</CardTitle>
          <CardDescription>
            Arctic sea ice extent and area over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="extent"
                stroke="#8884d8"
                name="Extent"
              />
              <Line
                type="monotone"
                dataKey="area"
                stroke="#82ca9d"
                name="Area"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolarIce;
