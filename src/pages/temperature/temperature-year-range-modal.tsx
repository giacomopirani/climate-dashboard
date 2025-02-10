import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MIN_DATE = new Date("1880-01-01");
const MAX_DATE = new Date("2024-12-31");

interface TemperatureYearRangeModalProps {
  startYear: Date | null;
  endYear: Date | null;
  setYearRange: (range: [Date | null, Date | null]) => void;
  onClose: () => void;
  defaultRange: [Date | null, Date | null];
}

export function TemperatureYearRangeModal({
  startYear,
  endYear,
  setYearRange,
  onClose,
  defaultRange,
}: TemperatureYearRangeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md md:rounded-lg p-4">
        <header className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-black">Select Start Year</h2>
          <button
            onClick={() => setYearRange(defaultRange)}
            className="text-red-500 hover:text-red-700"
          >
            Reset
          </button>
        </header>
        <div>
          <label className="block mb-1 font-semibold text-black">
            Start Year
          </label>
          <DatePicker
            selected={startYear}
            onChange={(date: Date | null) => {
              if (date) {
                let computedEnd = new Date(date.getFullYear() + 9, 11, 31);
                if (computedEnd > MAX_DATE) {
                  computedEnd = MAX_DATE;
                }
                setYearRange([date, computedEnd]);
              } else {
                setYearRange([null, null]);
              }
            }}
            showYearPicker
            dateFormat="yyyy"
            className="w-full border p-2 rounded text-black"
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
          />
        </div>
        {startYear && endYear && (
          <div className="mt-4">
            <p className="font-semibold text-black">
              Range: {startYear.getFullYear()} - {endYear.getFullYear()}
            </p>
          </div>
        )}
        <footer className="mt-4 border-t pt-2">
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
