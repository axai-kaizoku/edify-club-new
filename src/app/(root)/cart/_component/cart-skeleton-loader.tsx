import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* MOBILE VIEW */}
      <div className="sm:hidden flex flex-col mt-2 gap-6 p-4">
        <div className="h-6 w-24 bg-gray-300 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-10 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-400 rounded" />
      </div>

      {/* WEB VIEW */}
      <div className="hidden sm:flex h-screen">
        <div className="md:w-[50%] sm:w-[50%] lg:w-[60%] bg-gray-100 h-full p-6">
          <div className="h-8 w-32 bg-gray-300 rounded mb-6" />
          <div className="h-32 mb-5 bg-gray-200 rounded" />
          <div className="h-32 mb-5 bg-gray-200 rounded" />
          <div className="h-32 mb-5 bg-gray-200 rounded" />
        </div>

        <div className="md:w-[50%] sm:w-[50%] lg:w-[40%] bg-white p-6">
          <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
          <div className="h-20 bg-gray-200 rounded mb-4" />
          <div className="h-20 bg-gray-200 rounded mb-4" />
          <div className="h-20 bg-gray-200 rounded mb-4" />
          <div className="h-12 bg-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
