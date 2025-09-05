export default function LoadingComponent() {
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center flex-col gap-4 z-9999 fixed left-0 top-0">
      <div className="h-16 w-16 border-4 border-blue-600 border-e-transparent rounded-full animate-spin"></div>

      <p className="text-gray-700 text-base font-medium animate-pulse">
        Logging in... Please wait
      </p>
      <p className="text-gray-500 text-sm italic">
        Point of Sales is getting ready
      </p>
    </div>
  );
}
