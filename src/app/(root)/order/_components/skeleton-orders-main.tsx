import React from "react";

const SkeletonLoader = () => {
  return (
    <>
      {/* MOBILE */}
      <div className="sm:hidden flex flex-col gap-3 mb-2 animate-pulse px-4">
        <div className="rounded-[14px] border border-[#DEDEDE] flex flex-col gap-7 px-3 py-7 bg-gray-200">
          <div className="h-6 w-1/2 bg-gray-300 mx-auto rounded"></div>
          <div className="flex flex-col gap-1">
            <div className="h-4 w-3/4 bg-gray-300 mx-auto rounded"></div>
            <div className="h-5 w-2/3 bg-gray-300 mx-auto rounded"></div>
          </div>
          <div className="h-12 w-full bg-gray-300 rounded"></div>
          <div className="h-[1px] bg-[#D0D5DD]"></div>
          <div className="flex flex-col gap-7">
            <div className="h-16 w-full bg-gray-300 rounded"></div>
            <div className="h-16 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="rounded-[14px] border border-[#DEDEDE] flex flex-col px-5 py-4 gap-3 bg-gray-200">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-10 w-full bg-gray-300 rounded"></div>
          <div className="h-10 w-full bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* WEB */}
      <div className="hidden sm:flex flex-col gap-5 mt-6 animate-pulse">
        <div className="flex gap-4 items-center lg:mx-16 md:mx-8 sm:mx-4">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
        </div>

        <div className="flex justify-between gap-6 h-full lg:mx-16 md:mx-8 sm:mx-4">
          <div className="bg-gray-200 rounded-[14px] border border-[#DEDEDE] flex flex-col gap-7 py-4 px-6 flex-[65%] h-fit">
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-12 w-full bg-gray-300 rounded"></div>
            <div className="h-[1px] bg-[#D0D5DD]"></div>
            <div className="flex flex-col gap-7">
              <div className="h-16 w-full bg-gray-300 rounded"></div>
              <div className="h-16 w-full bg-gray-300 rounded"></div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-[14px] border border-[#DEDEDE] flex flex-col px-5 py-4 gap-3 flex-[35%]">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
