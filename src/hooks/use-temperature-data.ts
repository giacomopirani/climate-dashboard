import { api } from "@/lib/api";
import { TemperatureData } from "@/util/types/temperature-types";
import { useEffect, useState } from "react";

export function useTemperatureData() {
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
        console.error(err);
        setError("Failed to load temperature data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, isLoading, error };
}
