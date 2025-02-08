import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { formatCO2Date } from "@/util/format-date";
import LoadingSpinner from "@/util/loading-spinner";
import { CO2Data } from "@/util/types/co2-types";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../tooltip/custom-tooltip";

const CO2 = () => {
  const [data, setData] = useState<CO2Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await api.getCO2();
        const formattedData = result.co2.map((item: any) => ({
          ...item,
          trend: parseFloat(item.trend),
          cycle: parseFloat(item.cycle),
          date: formatCO2Date(item.year, item.month, item.day),
        }));
        setData(formattedData);
      } catch (err) {
        setError("Failed to load CO2 data");
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
      <h1 className="text-3xl font-bold">CO2 Levels</h1>
      <Card>
        <CardHeader>
          <CardTitle>CO2 Concentration</CardTitle>
          <CardDescription>
            Atmospheric CO2 concentration over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).getFullYear().toString()
                }
                interval={30} // Migliora la leggibilità sull'asse X
              />
              <YAxis tickFormatter={(tick) => tick.toLocaleString()} />
              <Tooltip content={CustomTooltip} />
              <Legend verticalAlign="top" height={36} />

              <Bar
                dataKey="trend"
                fill="#8884d8"
                name="Trend"
                animationDuration={800}
                barSize={20} // Aumenta la larghezza delle barre
              />

              <Bar
                dataKey="cycle"
                fill="#82ca9d"
                name="Cycle"
                animationDuration={800}
                barSize={20} // Aumenta la larghezza delle barre
              />

              <Brush
                dataKey="date"
                height={30}
                stroke="#8884d8"
                startIndex={data.length - 10} // Mostra di default gli ultimi 10 anni
                endIndex={data.length - 1} // Default fino all'ultimo anno disponibile
                travellerWidth={10} // Rende più fluido lo spostamento
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default CO2;
