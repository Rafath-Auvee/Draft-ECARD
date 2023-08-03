const LoadingOverlay = (props) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 bg-black backdrop-blur-3xl bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded p-4">
      <p className="text-lg font-semibold">{props.message || "Loading..."}</p>
      <div className="mt-2">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  </div>
);

export default LoadingOverlay;
