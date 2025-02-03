const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-56">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default LoadingSpinner;
