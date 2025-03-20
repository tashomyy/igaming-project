const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full inset-0 z-50">
      <img
        src="/banana-loader.png"
        alt="Loading"
        className="w-16 h-16 animate-spin text-primary"
      />
    </div>
  );
};

export default Loader;
