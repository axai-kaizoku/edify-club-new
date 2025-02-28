const SkeletonLoader = () => {
    return (
      <section className="w-full min-h-[40vh] lg:h-auto rounded-3xl bg-[#F3F3F3] flex flex-col lg:flex-row items-center justify-between animate-pulse">
        {/* Images Container Skeleton */}
        <div className="bg-[#D1D1D1] relative rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none lg:w-[35%] w-full h-[300px] lg:h-[400px] flex justify-center items-center">
          <div className="absolute w-32 h-32 bg-gray-300 rounded-lg"></div>
        </div>
  
        {/* Products Grid Skeleton */}
        <div className="w-full lg:w-[65%] p-2 lg:p-4 flex justify-around flex-wrap lg:flex-nowrap ">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="lg:max-w-60 lg:max-h-80 lg:min-w-40 lg:min-h-40 lg:w-60 lg:h-80 w-[8.6rem] xs:w-36 xs:h-80 max-h-72 my-2 px-1 h-fit mb-2 lg:mb-10"
            >
              <div className="py-14 relative px-2 w-full h-[20vh] lg:h-[78%] bg-gray-300 rounded-3xl lg:rounded-[1.8rem]"></div>
              <div className="flex flex-col gap-0 pt-1.5 lg:pt-4 ">
                <div className="flex items-center lg:justify-between w-full px-2">
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                  <div className="hidden lg:flex items-center gap-1 justify-center text-xs lg:text-sm">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <div className="w-10 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div className="w-full h-6 bg-gray-300 rounded mt-2 px-2"></div>
                <div className="flex items-center justify-between pr-1 lg:mt-3 px-2 my-1 lg:my-0">
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                  <div className="w-20 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default SkeletonLoader;
  