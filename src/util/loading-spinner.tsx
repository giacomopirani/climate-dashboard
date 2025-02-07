import { LoaderPinwheel } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center ">
      <LoaderPinwheel className="animate-spin rounded-full h-16 w-16 border-t-1 border-b-1 border-primary mb-56" />
    </div>
  );
};

export default LoadingSpinner;
