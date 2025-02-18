import { LoaderPinwheel } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <LoaderPinwheel className="animate-spin text-teal-500 h-16 w-16 mb-56" />
    </div>
  );
};

export default LoadingSpinner;
