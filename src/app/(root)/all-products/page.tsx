"use client"

import React, { useEffect, useRef, useState } from "react"
import { AllProductsIcons } from "./icons"
import { Container } from "@/components/common/container"
import { ProductCard } from "@/components/common/product-card"

import Drawer from "@/components/ui/bottom-drawer"
import AllProductsLeft from "./_components/all-products-left"
import { gql, useQuery } from "@apollo/client"
import { DeviceWithQty } from "@/server/api/cartActions"
import SkeletonLoader from "./_components/all-products-skeleton"
// import { useSearchParams } from "next/navigation"

const PRODUCTS_QUERY = gql`
  query GetProducts(
    $sort: String = "relevance_device:DESC"
    $ram: String
    $storage: String
    $processor: String
    $display: Float
    $color: JSON
    $brand: String
  ) {
    products(
      sort: $sort
      where: {
        ram: $ram
        storage: $storage
        display_size: $display
        processor: $processor
        color: $color
        brand: $brand
      }
    ) {
      _id
      device_name
      description
      image
      payable
      ram
      reviews {
        _id
        comment
        rating
        createdAt
      }
      reviewAggregates {
        overallReviews
        overallRating
        ratingDetails {
          stars
          percentage
          reviewsCount
        }
      }
    }
  }
`

function AllProducts() {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const [filterDrawer, setFilterDrawer] = useState(false)
  const [sortDrawer, setSortDrawer] = useState(false)
  const [price, setPrice] = useState([10000, 10000000])
  // const searchParams = useSearchParams()
  // const brandQuery = searchParams.get("brand") // Get brand from query params
  // console.log(brandQuery)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const sortingOptions = [
    "Relevance",
    "Most Recent",
    "Highest Price",
    "Lowest Price",
  ]

  const [selectedFilters, setSelectedFilters] = useState({
    brand: null,
    processor: null,
    display: null,
    color: null,
    ram: null,
    storage: null,
  })
  const [selectedSort, setSelectedSort] = useState("Relevance")

  const getSortValue = (option: string) => {
    switch (option) {
      case "Highest Price":
        return "payable:DESC"
      case "Lowest Price":
        return "payable:ASC"
      case "Most Recent":
        return "createdAt:DESC"
      default:
        return "relevance_device:DESC" // Ensure a valid default value
    }
  }

  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      sort: getSortValue(selectedSort),
      ram: selectedFilters.ram || undefined, // Only pass RAM filter if selected
      storage: selectedFilters.storage || undefined,
      display: selectedFilters.display || undefined,
      processor: selectedFilters.processor || undefined,
      color: selectedFilters.color || undefined,
      brand: selectedFilters.brand || undefined,
    },
  })

  const handleFilterChange = (key: string, value: string | number | null) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value, // Toggle filter
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      brand: null,
      processor: null,
      display: null,
      color: null,
      ram: null,
      storage: null,
    })
    setPrice([10000, 10000000])
  }

  const filteredProducts = data?.products.filter((product: DeviceWithQty) => {
    const payablePrice = product?.payable // Assuming payable is a number
    console.log(payablePrice, "payable")
    console.log(price[0], "pric 1")
    console.log(price[1], "pric 2")
    return (
      (!price[0] || payablePrice! >= Number(price[0])) &&
      (!price[1] || payablePrice! <= Number(price[1]))
    )
  })

  if (loading) return <SkeletonLoader/>
  if (error)
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )

  return (
    <Container>
      <section className="flex flex-col items-center justify-center w-full my-8">
        <h1 className="text-center font-orange text-xl lg:text-3xl xl:text-4xl mb-6">
          All Products
        </h1>
        <div className="w-full flex gap-8">
          {/* LEFT SECTION */}

          <AllProductsLeft
            clearAllFilters={clearAllFilters}
            selectedFilters={selectedFilters}
            values={price}
            setValues={setPrice}
            handleFilterChange={handleFilterChange}
            className="sm:w-[30%] sm:flex hidden"
          />

          {/* RIGHT SECTION */}
          <div className="w-[70%] flex flex-col gap-3 relative max-sm:w-full">
            {/* For Web view */}
            <div className="flex justify-between items-center max-sm:hidden">
              <span className="text-[#828282] text-lg sm:flex font-gilroySemiBold">
                {filteredProducts?.length || 0} Results found
              </span>
              <div ref={sortRef} className="relative">
                <button
                  className="flex gap-2 items-center rounded-[6px] border border-[#D5D5D5] px-4 py-2"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <img src="/sort.svg" alt="sortIcon" />
                  <span className="text-black font-gilroySemiBold text-base">
                    Sort By
                  </span>
                  {isSortOpen ? (
                    <AllProductsIcons.arrowUp />
                  ) : (
                    <AllProductsIcons.arrowDown />
                  )}
                </button>

                {/* Sort Modal */}
                {isSortOpen && (
                  <div className="flex flex-col absolute top-full z-10 right-0 mt-1 w-48 bg-white shadow-md rounded-xl gap-1 py-2 px-2 border border-[#D5D5D5]">
                    {sortingOptions.map((option) => (
                      <p
                        key={option}
                        className="px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-[#F7F7F7] hover:rounded-[6px] text-sm font-gilroySemiBold"
                        onClick={() => {
                          setSelectedSort(option)
                          setIsSortOpen(false)
                        }}
                      >
                        <span>{option}</span>
                        {selectedSort === option && (
                          <AllProductsIcons.green_tick />
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* For Mobile View */}
            <div className="flex bg-[#F7F7F7] rounded-[7px] items-center justify-between px-4 sm:hidden">
              <button
                className="flex gap-2 items-center rounded-[6px] px-4 py-2"
                onClick={() => {
                  setFilterDrawer(!filterDrawer)
                }}
              >
                <AllProductsIcons.filters_icon />
                <span className="text-black font-gilroySemiBold text-sm">
                  Filters
                </span>
                {filterDrawer ? (
                  <AllProductsIcons.arrowUp />
                ) : (
                  <AllProductsIcons.arrowDown />
                )}
              </button>

              <div className="text-[#E1E1E1]">|</div>

              <button
                className="flex gap-2 items-center rounded-[6px] px-4 py-2"
                onClick={() => setSortDrawer(!sortDrawer)}
              >
                <img src="/sort.svg" alt="sortIcon" />
                <span className="text-black font-gilroySemiBold text-sm">
                  Sort By
                </span>
                {sortDrawer ? (
                  <AllProductsIcons.arrowUp />
                ) : (
                  <AllProductsIcons.arrowDown />
                )}
              </button>
            </div>

            {filterDrawer && (
              <Drawer
                isOpen={filterDrawer}
                onClose={() => {
                  setFilterDrawer(false)
                }}
                className="bg-[#F7F7F7]"
              >
                <AllProductsLeft
                  clearAllFilters={clearAllFilters}
                  handleFilterChange={handleFilterChange}
                  values={price}
                  setValues={setPrice}
                  selectedFilters={selectedFilters}
                  className="sm:hidden w-full flex"
                />
              </Drawer>
            )}

            {sortDrawer && (
              <Drawer
                isOpen={sortDrawer}
                onClose={() => {
                  setSortDrawer(false)
                }}
                className="bg-white"
              >
                <div>
                  {sortingOptions.map((option) => (
                    <p
                      key={option}
                      className="px-4 py-2 cursor-pointer flex justify-between items-center hover:bg-[#F7F7F7] hover:rounded-[6px] text-sm font-gilroySemiBold"
                      onClick={() => {
                        setSelectedSort(option)
                        // setIsSortOpen(false);
                      }}
                    >
                      <span>{option}</span>
                      {selectedSort === option && (
                        <AllProductsIcons.green_tick />
                      )}
                    </p>
                  ))}
                </div>
              </Drawer>
            )}

            <div className="flex flex-wrap lg:gap-y-8 justify-between items-center w-full h-full  mb-2 lg:mb-8">
              {filteredProducts?.map((product: DeviceWithQty, i: number) => (
                <ProductCard
                  product={product}
                  res={3}
                  key={`${i}-${product.device_name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default AllProducts
