const SkeletonLoader = () => {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center my-2 lg:my-6">
        {/* Skeleton Heading */}
        <div className="w-40 h-8 lg:w-60 lg:h-12 bg-gray-300 animate-pulse rounded-md mt-5 lg:mt-1 mb-4 lg:mb-12"></div>
        
        {/* Skeleton Product Cards */}
        <div className="flex flex-wrap justify-around items-center w-full h-full lg:px-3 mb-2 lg:mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="lg:max-w-60 lg:max-h-80 lg:min-w-40 lg:min-h-40 lg:w-60 lg:h-80 w-[8.6rem] xs:w-36 xs:h-80 max-h-72 my-2 px-1 h-fit mb-2 lg:mb-10">
              <div className="py-14 relative px-2 w-full h-[20vh] lg:h-[78%] flex justify-center items-center bg-gray-300 animate-pulse rounded-3xl lg:rounded-[1.8rem]"></div>
              
              <div className="flex flex-col gap-0 pt-1.5 lg:pt-4 ">
                <div className="w-32 h-4 bg-gray-200 animate-pulse rounded-md mx-2 mb-1"></div>
                <div className="w-24 h-3 bg-gray-200 animate-pulse rounded-md mx-2 mb-2"></div>
                <div className="w-16 h-5 bg-gray-200 animate-pulse rounded-md mx-2 mb-3"></div>
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded-md mx-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  