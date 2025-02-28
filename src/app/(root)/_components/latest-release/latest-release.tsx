"use client" // ✅ This ensures it's treated as a Client Component

import { gql, useQuery } from "@apollo/client"
import { ProductCard } from "@/components/common/product-card"
import SkeletonLoader from "./skeleton-latest-release"

const GET_LATEST_RELEASE = gql`
  query {
    products(where: { latest_release: true }) {
      _id
      device_name
      description
      image
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

export const LatestRelease = () => {
  const { loading, error, data } = useQuery(GET_LATEST_RELEASE)

  if (loading) return <SkeletonLoader />
  if (error)
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )

  return (
    <div className="w-full h-full flex flex-col justify-center items-center my-2 lg:my-6">
      {/* {JSON.stringify(data.products)} */}
      <h3 className="font-orange text-2xl lg:text-4xl mt-5 lg:mt-1 mb-4 lg:mb-12">
        Latest Release
      </h3>
      <div className="flex flex-wrap justify-around items-center w-full h-full lg:px-3 mb-2 lg:mb-8">
        {data.products.map((product: any, i: number) => (
          <ProductCard
            product={product}
            res={3}
            key={`${i}-${product.device_name}`}
          />
        ))}
      </div>
    </div>
  )
}
