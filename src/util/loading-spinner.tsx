import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center ">
      <Loader className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary" />
    </div>
  );
};

export default LoadingSpinner;
