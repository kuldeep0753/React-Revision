export const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4 animate-pulse">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="w-64 h-48 bg-gray-200 rounded-lg shadow-md"
        ></div>
      ))}
    </div>
  );
};
