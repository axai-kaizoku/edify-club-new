const SkeletonLoader = () => {
    return (
      <section className="w-screen bg-[#F7F7F7] -mx-11 animate-pulse">
        <section className="bg-[#F7F7F7] w-full min-h-[40vh] hidden lg:flex lg:gap-5 justify-center items-center">
          <div className="w-[92%] sm:w-[90%] h-full lg:h-auto mt-[6%] mb-[8%] lg:mb-[3%] flex flex-row items-center justify-between">
            <div className="w-[55%] h-full flex flex-col gap-4">
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-8 w-48 bg-gray-300 rounded" />
              <div className="flex gap-x-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-6 w-16 bg-gray-300 rounded" />
                ))}
              </div>
              <div className="flex gap-x-2.5">
                <div className="h-10 w-28 bg-gray-300 rounded" />
                <div className="h-11 w-11 bg-gray-300 rounded-full" />
                <div className="h-11 w-11 bg-gray-300 rounded-full" />
              </div>
              <div className="flex gap-x-6 mt-3 -ml-4">
                {[...Array(3)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            </div>
            <div className="w-[30%] h-[60dvh] flex flex-col justify-between">
              <div className="h-[85%] w-full flex justify-center items-center bg-gray-300 rounded-lg" />
              <div className="flex w-full justify-end gap-x-6">
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
                <div className="h-10 w-10 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  };
  
  const ProductCardSkeleton = () => {
    return (
      <div className="lg:w-60 lg:h-80 w-[8.6rem] xs:w-36 xs:h-80 max-h-72 my-2 px-1 h-fit mb-2 lg:mb-10 animate-pulse">
        <div className="py-14 relative px-2 w-full h-[20vh] lg:h-[78%] flex justify-center items-center bg-gray-300 rounded-3xl lg:rounded-[1.8rem]" />
        <div className="flex flex-col gap-2 pt-1.5 lg:pt-4">
          <div className="h-4 w-32 bg-gray-300 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-6 w-24 bg-gray-300 rounded" />
        </div>
      </div>
    );
  };
  
  export default SkeletonLoader;
  