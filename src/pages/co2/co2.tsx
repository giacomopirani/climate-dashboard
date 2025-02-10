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
  // Stato per il range di date: default ultima settimana
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  // Stato per mostrare o nascondere il calendario a tutto schermo
  const [showCalendar, setShowCalendar] = useState(false);

  const { data, isLoading, error } = useCO2Data();

  // Filtriamo i dati in base al range selezionato
  const filteredData = useMemo(() => {
    return data.filter(({ date }) => {
      const d = new Date(date);
      return (!startDate || d >= startDate) && (!endDate || d <= endDate);
    });
  }, [data, startDate, endDate]);

  // Controllo: se la data di inizio è successiva a quella di fine, segnala l'errore
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

  // Calcola il numero di giorni selezionati
  const numDays =
    startDate && endDate
      ? Math.round(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <div className="space-y-6 mt-6 relative">
      <h1 className="text-3xl font-bold text-center">CO2 Levels</h1>

      {/* Pulsante per aprire il calendario a tutto schermo */}
      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowCalendar(true)}
        >
          Seleziona intervallo di date
        </button>
      </div>

      {/* Visualizzazione del range selezionato */}
      {startDate && endDate && (
        <div className="text-center text-gray-700">
          <p>
            Range selezionato:{" "}
            <span className="font-semibold">
              {startDate.toLocaleDateString()}
            </span>{" "}
            -{" "}
            <span className="font-semibold">
              {endDate.toLocaleDateString()}
            </span>
          </p>
          <p>
            {numDays} {numDays === 1 ? "giorno" : "giorni"} selezionati
          </p>
        </div>
      )}

      {/* Modal a tutto schermo per la selezione del range */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 bg-white overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Seleziona il range di date</h2>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setShowCalendar(false)}
              >
                Chiudi
              </button>
            </div>
            <DatePicker
              selectsRange
              startDate={startDate}
              endDate={endDate}
              onChange={(update: [Date | null, Date | null]) =>
                setDateRange(update)
              }
              inline
            />
          </div>
        </div>
      )}

      {/* Visualizzazione del grafico */}
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
