
export default function PageDataErrorFallback() {
  return (
     <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Server Temporarily Unavailable</h1>
          <p className="text-gray-600 mb-6">
            We're experiencing technical difficulties. Please try again in a few minutes.
          </p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
            {/* <button
              onClick={() => setShowFallback(true)}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              View Static Version
            </button> */}
          </div>
        </div>
      </div>
  )
}
