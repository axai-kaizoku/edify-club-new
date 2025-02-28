"use client"
import { ArrowRight, Cart, HeartIcon } from "@/components/common/icons"
import { ChevronLeft, ChevronRight } from "../img-comparison/icons"
import { ProductCard } from "@/components/common/product-card"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { gql, useQuery } from "@apollo/client"
import SkeletonLoader from "./skeleton-top-picks"
import { useRouter } from "next/navigation"

export const TopPicks = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const router = useRouter();

  const TOP_PICKS = gql`
    query {
      products (where: { is_trending: true }){
        _id
        device_name
        color
        latest_release
        image
        brand
        ram
        processor
        storage
        perfectFor
        device_condition
        payable
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

  const { loading, error, data } = useQuery(TOP_PICKS)

  if (loading) return <SkeletonLoader />
  if (error)
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )

  const products = data?.products.slice(0, 4) || []

  if (products.length === 0) return <div>No products available</div>

  const currentProduct = products[currentIdx]
  const remainingProducts = products.filter((_, index) => index !== currentIdx)

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : products.length - 1))
  }

  const handleNext = () => {
    setCurrentIdx((prev) => (prev < products.length - 1 ? prev + 1 : 0))
  }

  return (
    <section className="w-screen bg-[#F7F7F7] -mx-11">
      <section className="bg-[#F7F7F7] w-full min-h-[40vh] hidden lg:flex justify-center items-center">
        <div className="w-[92%] sm:w-[90%] h-full lg:h-auto mt-[6%] mb-[8%] lg:mb-[3%] flex flex-row items-center justify-between">
          <div className="w-[55%] h-full flex flex-col gap-4">
            <span className="text-[#C7C7C7] font-gilroySemiBold">
              Top Picks
            </span>
            <h2 className="font-orange text-4xl">
              {currentProduct.device_name}
            </h2>

            <div className="flex justify-start items-center gap-x-4">
              {currentProduct.perfectFor.map((val: any) => (
                <span
                  key={val.title}
                  className="border border-[#EFEFEF] bg-white px-2 lg:px-3 py-0 lg:py-0.5 rounded-3xl flex justify-center items-center text-xs lg:text-sm font-gilroyMedium"
                >
                  {val.title}
                </span>
              ))}
            </div>

            <div className="flex gap-x-2.5">
              <div className="hidden lg:flex h-fit w-fit bg-black cursor-pointer text-white font-gilroyMedium whitespace-nowrap text-sm justify-center px-3.5 py-3 items-center rounded-3xl gap-x-1">
                <Cart className="size-5" />
                Add to cart
              </div>
              <div className="bg-black cursor-pointer text-white rounded-full size-11 flex items-center justify-center" onClick={()=>{ router.push(`/products/${currentProduct._id}`) }}>
                <ArrowRight />
              </div>
              {/* <div className="bg-black cursor-pointer text-white rounded-full size-11 flex items-center justify-center">
                <HeartIcon className="size-6" />
              </div> */}
            </div>

            {/* Render Remaining Devices */}
            <div className="flex gap-x-6 mt-3 -ml-4">
              {remainingProducts.map((prod, i) => (
                <ProductCard key={prod._id} product={prod} imgBgColor="white" />
              ))}
            </div>
          </div>

          {/* Image & Navigation */}
          <div className="w-[45%] h-[90dvh] flex flex-col justify-between">
            <div className="h-[85%] w-full flex justify-center items-center" onClick={()=>{ router.push(`/products/${currentProduct._id}`) }}>
              <img
                src={
                  currentProduct.image?.[0].url ||
                  "/media/product-img/dell3.png"
                }
                alt={currentProduct.device_name}
                width={400}
                height={800}
                className="object-contain select-none"
              />
            </div>

            <div className="flex w-full justify-end">
              <div className="flex items-center gap-x-6">
                <button
                  disabled={currentIdx === 0}
                  className={cn(
                    "cursor-pointer disabled:cursor-not-allowed text-white rounded-full lg:size-10 flex items-center justify-center",
                    currentIdx === 0 ? "bg-[#E2E2E2]" : "bg-black"
                  )}
                  onClick={handlePrev}
                >
                  <ChevronLeft color="white" />
                </button>

                <button
                  disabled={currentIdx === products.length - 1}
                  className={cn(
                    "cursor-pointer disabled:cursor-not-allowed text-white rounded-full lg:size-10 flex items-center justify-center",
                    currentIdx === products.length - 1
                      ? "bg-[#E2E2E2]"
                      : "bg-black"
                  )}
                  onClick={handleNext}
                >
                  <ChevronRight color="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
