import React from "react";

const AddressSkeletonLoader = () => {
  return (
    <>
      {/* Mobile View */}
      <div className="flex flex-col my-2 gap-6 sm:hidden px-6">
        <div className="flex items-center animate-pulse gap-3">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <p className="font-gilroySemiBold text-xl flex-grow text-center pr-9 bg-gray-300 h-6 rounded-md" />
        </div>

        <div className="flex flex-col gap-[10px]">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="py-2 pl-2 border rounded-[10px] gap-3 flex items-center justify-between animate-pulse bg-gray-200"
            >
              <div className="flex gap-3 items-center">
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
                <div className="flex flex-col justify-around">
                  <p className="w-24 h-4 bg-gray-300 rounded-md" />
                  <p className="w-32 h-3 bg-gray-300 rounded-md mt-1" />
                </div>
              </div>
              <div className="mr-5 w-5 h-5 bg-gray-300 rounded-md" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="bg-gray-300 text-black text-sm font-gilroySemiBold text-center py-3 rounded-[8px] animate-pulse"
        >
          Add Address
        </button>
      </div>

      {/* Web View */}
      <div className="hidden sm:flex gap-6 animate-pulse px-12 my-8">
        {/* Left Section */}
        <div className="w-2/3 flex flex-col gap-6">
          <div className="w-full h-8 bg-gray-300 rounded-md" />
          <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="p-4 border rounded-[10px] flex flex-col gap-3 bg-gray-200"
              >
                <div className="w-16 h-4 bg-gray-300 rounded-md" />
                <div className="w-full h-4 bg-gray-300 rounded-md" />
                <div className="w-20 h-4 bg-gray-300 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3 flex flex-col gap-6">
          <div className="w-full h-8 bg-gray-300 rounded-md" />
          <div className="h-32 bg-gray-200 rounded-md" />
          <div className="h-32 bg-gray-200 rounded-md" />
          <div className="h-32 bg-gray-200 rounded-md" />
          <div className="w-full h-10 bg-gray-300 rounded-md" />
          <div className="w-full h-10 bg-gray-300 rounded-md" />
        </div>
      </div>
    </>
  );
};

export default AddressSkeletonLoader;
