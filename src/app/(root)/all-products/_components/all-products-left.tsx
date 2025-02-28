import React, { SetStateAction, useState } from "react"
import { cn } from "@/lib/utils" // Adjust the import path based on where `cn` is defined

import { AllProductsIcons } from "../icons"
import { PriceSlider } from "./price-slider"

interface AllProductsLeftSection {
  clearAllFilters: () => void
  selectedFilters: {
    color?: string
    storage?: string
    ram?: string
    processor?: string
    display?: string
    minPrice?: string
    maxPrice?: string
  }
  handleFilterChange: (key: string, value: string | number) => void
  className?: string // Allowing custom className prop
  values: number[]
  setValues: React.Dispatch<SetStateAction<number[]>>
}

function AllProductsLeft({
  clearAllFilters,
  selectedFilters,
  handleFilterChange,
  className, // Accepting custom styles
  values,
  setValues,
}: AllProductsLeftSection) {
  const [selectBrand, setSelectBrand] = useState<number | null>(null)

  const brandOptions = [
    { icon: AllProductsIcons.windows, name: "Windows" },
    { icon: AllProductsIcons.hp, name: "HP" },

    { icon: AllProductsIcons.acer, name: "Acer" },
    { icon: AllProductsIcons.apple, name: "Apple" },
  ]

  const colors = ["#000000", "#33FF57", "#3357FF", "#F0E68C"]

  const processorOptions = [
    { label: "Intel", value: "Intel Core i7" },
    { label: "AMD", value: "Intel Core i5" },
    { label: "Apple M1", value: "Intel Core i8" },
  ]

  const displayOptions = [
    { label: "13-inch", value: 13 },
    { label: "15-inch", value: 15 },
    { label: "17-inch", value: 17 },
  ]
  const storageOptions = [
    { label: "128GB", value: "128GB" },
    { label: "256GB", value: "256GB" },
    { label: "512GB", value: "512GB" },
  ]
  const ramOptions = [
    { label: "8GB", value: "8GB" },
    { label: "16GB", value: "16GB" },
    { label: "32GB", value: "32GB" },
  ]

  return (
    <div
      className={cn(
        "w-full h-fit bg-[#F7F7F7] flex-col gap-3 lg:gap-4 rounded-xl lg:rounded-3xl p-2 lg:p-4 ",
        className
      )}
    >
      <div className="flex justify-between items-center px-5">
        <p className="text-base lg:text-2xl font-gilroyMedium">Filters</p>
        <p
          className="text-sm lg:text-base text-[#828282] font-gilroyMedium cursor-pointer"
          onClick={() => {
            clearAllFilters()
            setSelectBrand(null)
          }}
        >
          Clear All
        </p>
      </div>
      {/* Filter Badges */}
      {/* {Object.keys(selectedFilters).some(
        (key) => selectedFilters[key as keyof typeof selectedFilters]
      ) && (
        <div className="flex flex-wrap gap-2 px-5 py-2">
          {Object.entries(selectedFilters).map(([key, value]) =>
            value ? (
              <div
                key={key}
                className="bg-black text-white text-xs lg:text-sm font-gilroyMedium px-3 py-1 rounded-full flex items-center gap-2"
              >
                {key}: {value}
                <span
                  className="cursor-pointer text-white"
                  onClick={() => handleFilterChange(key, "")}
                >
                  ✕
                </span>
              </div>
            ) : null
          )}
        </div>
      )} */}
      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        hasFilter={!!selectedFilters.brand}
        selectedCount={selectedFilters.brand ? 1 : 0}
      >
        {/* <input
          type="search"
          placeholder="Search brands..."
          className="p-2 rounded-md w-full bg-[#F7F7F7] text-xs focus:outline-none placeholder:font-gilroyMedium lg:pl-6"
        /> */}
        <div className="flex flex-col gap-2 mt-2">
          {brandOptions.map(({ icon: Icon, name }, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectBrand(index)
                handleFilterChange("brand", brandOptions[index].name)
              }}
              className={`flex justify-between items-center p-2 rounded-md w-full hover:bg-[#F7F7F7] cursor-pointer ${
                selectBrand === index ? "bg-[#E0E0E0]" : ""
              }`}
            >
              <div className="flex gap-2 items-center">
                <Icon />
                <h1 className="text-xs lg:text-sm font-gilroySemiBold">
                  {name}
                </h1>
              </div>
              {selectBrand === index && <AllProductsIcons.green_tick />}
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Other Filters */}
      <FilterSection title="Price">
        <PriceSlider values={values} setValues={setValues} />
      </FilterSection>

      <FilterSection
        title="Color"
        hasFilter={!!selectedFilters.color}
        selectedCount={selectedFilters.color ? 1 : 0}
      >
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <div
              key={color}
              className={`size-4 rounded-full ring ring-gray-700 ${
                selectedFilters.color === color
                  ? "ring-opacity-15"
                  : "ring-opacity-0"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleFilterChange("color", color)}
            ></div>
          ))}
        </div>
      </FilterSection>

      <FilterSection
        title="Storage"
        hasFilter={!!selectedFilters.storage}
        selectedCount={selectedFilters.storage ? 1 : 0}
      >
        <FilterOption
          options={storageOptions}
          selected={selectedFilters.storage || ""}
          onSelect={(value) => handleFilterChange("storage", value)}
        />
      </FilterSection>

      <FilterSection
        title="RAM"
        hasFilter={!!selectedFilters.ram}
        selectedCount={selectedFilters.ram ? 1 : 0}
      >
        <FilterOption
          options={ramOptions}
          selected={selectedFilters.ram || ""}
          onSelect={(value) => handleFilterChange("ram", value)}
        />
      </FilterSection>

      <FilterSection
        title="Processor"
        hasFilter={!!selectedFilters.processor}
        selectedCount={selectedFilters.processor ? 1 : 0}
      >
        <FilterOption
          options={processorOptions}
          selected={selectedFilters.processor || ""}
          onSelect={(value) => handleFilterChange("processor", value)}
        />
      </FilterSection>

      <FilterSection
        title="Display Size"
        hasFilter={!!selectedFilters.display}
        selectedCount={selectedFilters.display ? 1 : 0}
      >
        <FilterOption
          options={displayOptions}
          selected={selectedFilters.display || ""}
          onSelect={(value) => handleFilterChange("display", value)}
        />
      </FilterSection>
    </div>
  )
}

export default AllProductsLeft

interface FilterSectionProps {
  title?: string
  children?: React.ReactNode
  hasFilter?: boolean
}

const FilterSection: React.FC<{
  title: string
  selectedCount: number
  children?: React.ReactNode
}> = ({ title, selectedCount, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-md p-2 lg:p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm lg:text-lg font-gilroyMedium flex items-center gap-2">
          {title}
          {selectedCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {selectedCount}
            </span>
          )}
        </p>
        {isOpen ? <AllProductsIcons.arrowUp /> : <AllProductsIcons.arrowDown />}
      </div>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  )
}

export const FilterOption = ({
  options,
  selected,
  onSelect,
}: {
  options: { label: string; value: string | number }[] | undefined
  selected: string | null
  onSelect: (value: string | number) => void
}) => (
  <div className="flex gap-2 flex-wrap">
    {options?.map((option) => (
      <div
        key={option.value}
        onClick={() => onSelect(option.value)}
        className={`border lg:border-2 font-gilroySemiBold border-[#D7D7D7] lg:text-base text-sm text-[#D7D7D7] px-1 py-0.5  lg:p-2 w-fit rounded lg:rounded-lg cursor-pointer hover:border-[#2E8016] hover:border lg:hover:border-2 hover:text-black ${
          selected === option.value ? "border-green-700 text-black" : ""
        }`}
      >
        {option.label}
      </div>
    ))}
  </div>
)
