import React from "react";

const CheckoutSkeleton = () => {
  return (
    <div className="flex flex-col mt-2 gap-6 z-10 sm:hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <p className="flex-grow text-center pr-9 bg-gray-300 h-6 w-28 rounded-md"></p>
      </div>

      {/* Delivery Address Skeleton */}
      <div className="flex flex-col gap-[15px] px-1">
        <div className="flex justify-between items-center">
          <div className="h-5 w-36 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
        </div>

        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
            <div className="h-4 w-48 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        <div className="h-[1px] bg-gray-300"></div>

        {/* Cart Preview Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-gray-300 rounded-md"></div>
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        </div>

        {[1, 2].map((index) => (
          <div className="flex gap-2" key={index}>
            <div className="w-14 h-10 bg-gray-300 rounded-md"></div>
            <div className="flex flex-col flex-grow gap-1">
              <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
              <div className="h-3 w-32 bg-gray-300 rounded-md"></div>
              <div className="h-5 w-16 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}

        <div className="h-[1px] bg-gray-300"></div>

        {/* Summary Skeleton */}
        <div className="flex flex-col gap-3">
          <div className="h-5 w-24 bg-gray-300 rounded-md"></div>
          {[1, 2, 3].map((index) => (
            <div className="flex justify-between items-center" key={index}>
              <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
              <div className="h-4 w-10 bg-gray-300 rounded-md"></div>
            </div>
          ))}
          <div className="h-5 w-40 bg-gray-300 rounded-md"></div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="flex justify-between items-center">
            <div className="h-5 w-16 bg-gray-300 rounded-md"></div>
            <div className="h-5 w-20 bg-gray-300 rounded-md"></div>
          </div>
          <button className="h-10 bg-gray-300 rounded-md"></button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;