import React from "react";

const SkeletonLoader = () => {
  return (
    <section className="flex flex-col px-4 sm:px-6 lg:px-6 xl:px-10 mt-6 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between w-full sm:gap-3 lg:gap-8">
        {/* Left side - Image section */}
        <div className="w-full sm:w-1/2 lg:w-[calc(50%-32px)] flex flex-col relative lg:gap-8 gap-3 max-sm:mb-2">
          <div className="bg-gray-300 rounded-[27px] h-[40vh] sm:h-[60%] w-full"></div>
          <div className="flex justify-between w-full sm:h-[40%] gap-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-300 rounded-[27px] p-6 h-full w-1/4"></div>
            ))}
          </div>
        </div>

        {/* Right side - Details section */}
        <div className="w-full sm:w-1/2 lg:w-[calc(50%-32px)] flex flex-col gap-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>

          {/* Pricing */}
          <div className="flex items-center justify-between py-1">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>

          {/* Specifications */}
          <div className="flex flex-col gap-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-5 bg-gray-300 rounded w-3/4"></div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonLoader;
