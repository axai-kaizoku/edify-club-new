"use client"
import React from "react"

import AddressIcons from "./icons"
import { Address } from "@/server/api/addressActions"

interface AllAddressProps {
  selected?: string
  setSelected: (state: string) => void
  setPage: (page: number | ((prevPage: number) => number)) => void
  allAddresses: Address[]
}

const AllAddresses = ({
  selected,
  setSelected,
  setPage,
  allAddresses,
}: AllAddressProps) => {
  // const { data } = useQuery({
  //   queryKey: ["all-address"],
  //   queryFn: getAddress,
  // })

  return (
    <section className="w-full flex flex-col items-center gap-5">
      {/* {JSON.stringify(data)} */}
      <div className="flex flex-col gap-3.5 lg:w-[74%]">
        {allAddresses?.map((option) => (
          <label key={option._id} className="relative cursor-pointer">
            <input
              type="radio"
              name="radioOptions"
              value={option._id}
              checked={selected === option?._id}
              onChange={() => setSelected(option?._id)}
              className="hidden"
            />
            <div
              className={`p-2 pr-4 border rounded-[10px] gap-3 flex items-center transition-all ${
                selected === option._id
                  ? "border-black"
                  : "border-[#C7C7C7] bg-white"
              }`}
            >
              <div className="relative">
                {selected === option._id && (
                  <AddressIcons.location_icon className="absolute left-[35%] top-[35%]" />
                )}

                <img
                  src="/media/map.webp"
                  alt="map"
                  width={78.08}
                  height={81.425}
                />
              </div>

              <div className="flex flex-col justify-between gap-2 w-full">
                <div className="flex items-center">
                  <p className="text-xl text-[#1A1A1A] font-gilroySemiBold">
                    {option.address}
                  </p>

                  <span className="text-xs w-fit right-0 font-gilroySemiBold text-[#2E8016] px-3 ml-6  py-1 rounded-[13.92px] bg-[#E0F9E7]">
                    {option.isPrimary ? "Primary" : "Secondary"}
                  </span>

                  <p className="text-sm flex-grow text-right font-gilroySemiBold leading-[20px] text-[#17183B]">
                    Edit
                  </p>
                </div>
                <p className="text-base text-[#17183B] font-gilroyMedium">
                  {option.address}
                </p>
              </div>
            </div>
          </label>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setPage((prev: number) => prev + 1)
        }}
        className="bg-white text-black border-[1.5px] border-black text-sm font-gilroySemiBold text-center py-3 px-14 tracking-[0.091px] rounded-[8px] -mt-1 mb-2"
      >
        Add Address
      </button>
    </section>
  )
}

export default AllAddresses
