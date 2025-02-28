"use client"
import React from "react"
import { BlackTick } from "./icons"
import { useQuery } from "@tanstack/react-query"
import { Spinner } from "@/components/ui/spinner"
import { fetchAllTestimonials } from "@/server/api/testimonialActions"

function Testimonials() {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonial"],
    queryFn: fetchAllTestimonials,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnMount: false, // Prevents refetching on mount
    refetchOnWindowFocus: false, // Prevents refetching when switching tabs
  })

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )
  }
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between justify-center gap-16 items-center  bg-[#F7F7F7] rounded-[38px] p-4 pt-12 sm:pb-16 md:mx-12 lg:px-16">
        {/* <div className="rounded-[21.369px] sm:w-[50%] xl:w-[30%] xl:ml-16 border rotate-6 border-[#F3F3F3] flex flex-col gap-5 bg-white shadow-[0px_0px_16.7px_0px_rgba(0,0,0,0.05)] p-4">
          <h1 className="text-sm font-gilroySemiBold text-center">
            “Lorem ipsum dolor sit amet, consectet adipiscing elit. Phasellus
            feugiat lacus vitae neque ornare, adipiscing lacus vitae libero!”
          </h1>
          <div className="flex items-center gap-2">
            <img
              src="/media/testimonial-img.png"
              alt="profile-image"
              className="bg-contain size-12 rounded-full"
            />
            <div>
              <h1 className="text-xs font-gilroySemiBold">Antonia Jonathan</h1>
              <p className="text-[10px] font-gilroyMedium text-[#818A9C]">
                XYX
              </p>
            </div>
          </div>
        </div> */}

        {/* Stacked Testimonials */}
        <div className="relative xl:-mt-40 w-full sm:w-[80%] sm:-mt-48 xl:w-[30%] xl:ml-16 max-sm:mb-40 max-sm:w-[80%]">
          {testimonials?.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className={`absolute w-full rounded-[21.369px] top-0 left-0 right-0 border border-[#F3F3F3] flex flex-col gap-5 rotate-6 bg-white shadow-[0px_0px_16.7px_0px_rgba(0,0,0,0.05)] p-4 transition-all duration-300`}
              style={{
                transform: `rotate(${
                  index % 2 === 0 ? "5deg" : "-5deg"
                }) translateY(${index * 10}px) scale(${1 - index * 0.05})`,
                zIndex: testimonials.length - index,
                opacity: index === 0 ? 1 : 0.8,
              }}
            >
              <h1 className="text-sm font-gilroySemiBold text-center">
                {testimonial.content} “Lorem ipsum dolor sit amet, consectet
                adipiscing elit. Phasellus feugiat lacus vitae neque ornare,
                adipiscing lacus vitae libero!”
              </h1>
              <div className="flex items-center gap-2">
                <img
                  src={
                    !testimonial?.userInfo?.image
                      ? `/media/testimonial-img.png`
                      : testimonial?.userInfo?.image
                  }
                  alt="profile-image"
                  className="bg-contain size-12 rounded-full"
                />
                <div>
                  <h1 className="text-xs font-gilroySemiBold">
                    {testimonial?.userInfo?.first_name}{" "}
                    {testimonial?.userInfo?.last_name}
                  </h1>
                  <p className="text-[10px] font-gilroyMedium text-[#818A9C]">
                    {testimonial?.userInfo?.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center  w-full sm:relative sm:text-start flex justify-center  items-center sm:items-start flex-col gap-4 lg:w-[50%]">
          <div className="sm:pb-6">
            <h1 className="font-gilroySemiBold text-2xl sm:text-3xl lg:text-4xl">
              Join the Club
            </h1>
            <p className="font-gilroySemiBold text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">
              Stay Ahead of the Trends!
            </p>
          </div>

          <input
            type="text"
            className="w-full focus:outline-none my-4 xl:text-base sm:placeholder:text-start placeholder:text-center placeholder:text-base sm:placeholder:text-lg lg:placeholder:text-base font-gilroyMedium  placeholder:text-black bg-transparent border-b-2  border-black"
            placeholder="Enter your email"
          />
          <button className="text-white text-xl sm:text-base lg:text-sm sm:absolute right-2 bottom-[84px] text-center bg-black py-2 px-4 rounded-full w-fit font-gilroySemiBold">
            Submit
          </button>
          <div className="flex gap-2 py-2">
            <BlackTick />
            <span className="font-gilroyMedium text-base sm:text-lg lg:text-xl text-nowrap">
              Join the 1000’s of new explorers{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonials
