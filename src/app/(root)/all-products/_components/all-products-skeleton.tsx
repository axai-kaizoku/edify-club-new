import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex gap-8 w-full animate-pulse my-8 px-6 lg:px-10">
      {/* Left - Filters Skeleton */}
      <div className="sm:w-[30%] hidden sm:flex flex-col gap-4 bg-[#F7F7F7] p-4 rounded-xl">
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        <div className="h-6 w-24 bg-gray-200 rounded mt-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* Right - Products Skeleton */}
      <div className="w-[70%] flex flex-col gap-4 max-sm:w-full">
        {/* Results Count Skeleton */}
        <div className="h-6 w-48 bg-gray-200 rounded"></div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-2">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-3"
            >
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
