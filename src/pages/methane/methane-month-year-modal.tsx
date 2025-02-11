import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface MethaneMonthYearModalProps {
  selectedMonth: Date | null;
  setSelectedMonth: (date: Date | null) => void;
  onClose: () => void;
  defaultMonth: Date;
}

export function MethaneMonthYearModal({
  selectedMonth,
  setSelectedMonth,
  onClose,
  defaultMonth,
}: MethaneMonthYearModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md md:rounded-lg p-4 flex flex-col">
        <header className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-xl font-bold">Select Month & Year</h2>
          <button
            onClick={() => setSelectedMonth(defaultMonth)}
            className="text-red-500 hover:text-red-700"
          >
            Reset
          </button>
        </header>

        <main className="flex-grow p-4 flex justify-center">
          <DatePicker
            selected={selectedMonth}
            onChange={(date: Date | null) => setSelectedMonth(date)}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            className="w-full border p-2 rounded"
          />
        </main>

        <footer className="px-4 py-3 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
          >
            Save and Close
          </button>
        </footer>
      </div>
    </div>
  );
}
