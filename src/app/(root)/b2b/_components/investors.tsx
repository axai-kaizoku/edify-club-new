const Investors = ({ heading }: { heading: string }) => {
  return (
    <section className="flex flex-col sm:gap-0 max-sm:mb-16 sm:py-4 h-full">
      <h1 className="text-center font-orange text-2xl text-nowrap lg:text-3xl xl:text-4xl mb-10">
        {heading}
      </h1>
      <div className="items-center  justify-between hidden sm:flex px-2 md:px-16 lg:px-28 h-full">
        <img
          src="/media/b2b/di.png"
          alt="di"
          className="lg:w-[80px] lg:h-[80px] sm:size-16 w-[38px] h-[38px]"
          loading="lazy"
        />
        <img
          src="/media/b2b/inflection.png"
          alt="inflection"
          className="lg:w-[140px] lg:h-[90px] sm:w-28 sm:h-20  w-[35px] h-[45px]"
          loading="lazy"
        />
        <img
          src="/media/b2b/beenext.png"
          alt="beenext"
          className="xl:w-[200px] xl:h-[150px] lg:w-[160px] lg:h-[90px] sm:w-24 md:w-[110px] w-[120px] h-[90px] object-contain"
          loading="lazy"
        />
        <img
          src="/media/b2b/prime.png"
          alt="prime"
          className="xl:w-[130px] xl:h-[40px] lg:w-[110px] lg:h-[35px] sm:w-[90px] sm:h-[30px] w-[80px] h-[28px]  object-contain"
          loading="lazy"
        />
      </div>
      <div className="sm:py-4 items-center justify-around sm:hidden flex overflow-x-auto gap-10">
        <img
          src="/media/b2b/di.png"
          alt="di"
          className="w-auto h-8 object-contain"
          loading="lazy"
        />
        <img
          src="/media/b2b/inflection.png"
          alt="inflection"
          className="w-auto h-8  object-contain"
          loading="lazy"
        />
        <img
          src="/media/b2b/beenext.png"
          alt="beenext"
          className="w-28 object-contain h-12"
          loading="lazy"
        />
        <img
          src="/media/b2b/prime.png"
          alt="prime"
          className="w-24 object-contain h-8"
          loading="lazy"
        />
      </div>
    </section>
  )
}

export default Investors
