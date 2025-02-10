import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingSpinner from "@/util/loading-spinner";
import { Calendar } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useTemperatureData } from "../../hooks/use-temperature-data";
import TemperatureChart from "./temperature-chart";
import { TemperatureYearRangeModal } from "./temperature-year-range-modal";

const Temperature: React.FC = () => {
  // Imposta il range di default: dal 1880 al 2024 (10 anni alla volta verrà calcolato in base allo start)
  const defaultStart = new Date("1880-01-01");
  // Calcoliamo automaticamente l'anno finale come start + 9 (o MAX_DATE se oltrepassa)
  const MAX_DATE = new Date("2024-12-31");
  let computedDefaultEnd = new Date(defaultStart.getFullYear() + 9, 11, 31);
  if (computedDefaultEnd > MAX_DATE) computedDefaultEnd = MAX_DATE;
  const defaultRange: [Date | null, Date | null] = [
    defaultStart,
    computedDefaultEnd,
  ];

  // Stato per il range di anni
  const [yearRange, setYearRange] =
    useState<[Date | null, Date | null]>(defaultRange);
  const [startYear, endYear] = yearRange;

  // Stato per mostrare/nascondere il modal di selezione degli anni
  const [showYearPicker, setShowYearPicker] = useState(false);

  // Recupera i dati tramite il custom hook
  const { data, isLoading, error } = useTemperatureData();

  // Filtraggio dei dati in base all'anno (estratto dal campo "time")
  const filteredData = useMemo(() => {
    return data.filter(({ time }) => {
      const d = new Date(time);
      const year = d.getFullYear();
      const start = startYear ? startYear.getFullYear() : -Infinity;
      const end = endYear ? endYear.getFullYear() : Infinity;
      return year >= start && year <= end;
    });
  }, [data, startYear, endYear]);

  // Calcola il numero di anni selezionati (inclusivi)
  const numYears =
    startYear && endYear
      ? endYear.getFullYear() - startYear.getFullYear() + 1
      : 0;

  if (startYear && endYear && startYear > endYear) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-center">
          Start year cannot be later than end year.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="space-y-6 mt-6 relative">
      <h1 className="text-3xl font-bold text-center">
        Global Temperature Trends
      </h1>

      {/* Pulsante per aprire il modal di selezione degli anni con icona */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowYearPicker(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Calendar size={20} />
          Select year range
        </button>
      </div>

      {/* Visualizzazione del range selezionato */}
      {startYear && endYear && (
        <div className="text-center text-gray-700">
          <p>
            Selected range:{" "}
            <span className="font-semibold">{startYear.getFullYear()}</span> -{" "}
            <span className="font-semibold">{endYear.getFullYear()}</span>
          </p>
          <p>
            {numYears} {numYears === 1 ? "year" : "years"} selected
          </p>
        </div>
      )}

      {/* Modal a tutto schermo per la selezione del range di anni */}
      {showYearPicker && (
        <TemperatureYearRangeModal
          startYear={startYear}
          endYear={endYear}
          setYearRange={setYearRange}
          onClose={() => setShowYearPicker(false)}
          defaultRange={defaultRange}
        />
      )}

      {/* Visualizzazione del grafico */}
      <Card>
        <CardHeader>
          <CardTitle>Temperature Anomalies</CardTitle>
          <CardDescription>
            Global land-surface air temperature anomalies relative to the
            1951-1980 average.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TemperatureChart data={filteredData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Temperature;
