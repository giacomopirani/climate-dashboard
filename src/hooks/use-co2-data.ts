import { api } from "@/lib/api";
import { formatCO2Date } from "@/util/format-date";
import { CO2Data } from "@/util/types/co2-types";
import { useEffect, useState } from "react";

export const useCO2Data = () => {
  const [data, setData] = useState<CO2Data[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await api.getCO2();
        const formattedData = result.co2.map((item: any) => ({
          ...item,
          trend: parseFloat(item.trend),
          cycle: parseFloat(item.cycle),
          date: formatCO2Date(item.year, item.month, item.day),
        }));
        setData(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to load CO2 data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
};
