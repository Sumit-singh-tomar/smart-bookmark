export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
        
        {/* Inner spinning ring */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}