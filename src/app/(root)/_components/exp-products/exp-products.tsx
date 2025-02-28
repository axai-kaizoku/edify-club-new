"use client"
import { ProductCard } from "@/components/common/product-card"
import { gql, useQuery } from "@apollo/client"
import SkeletonLoader from "../latest-release/skeleton-latest-release"

export const ExploreProducts = () => {
  const GET_ALL_PRODUCTS = gql`
    query {
      products {
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

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)

  if (loading) return <SkeletonLoader />
  if (error)
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )

  return (
    <div className="w-full h-full flex flex-col justify-center items-center my-2 lg:my-6">
      <h3 className="font-orange text-2xl lg:text-4xl mt-5 lg:mt-1 mb-4 lg:mb-6">
        Explore Products
      </h3>
      {/* <div className=" w-full h-full flex flex-wrap justify-around items-center  lg:px-3 mb-2 lg:mb-8"> */}
      <div className="flex w-full h-full justify-center items-center">
        <div className=" w-full h-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-0 lg:gap-y-6 lg:px-3 mb-2 lg:mb-8">
          {data?.products?.slice(0, 8).map((product: any, i: number) => (
            <ProductCard
              product={product}
              res={3}
              key={`${i}-${product.device_name}`}
            />
          ))}
        </div>
      </div>

      {/* <div className="flex flex-wrap justify-around items-center w-full h-full lg:px-3 mb-2 lg:mb-8 mt-1 lg:mt-4">
        {[...productsMockData, ...productsMockData].map((product, i) => (
          <ProductCard
            product={product}
            res={3}
            key={`${i}-${product.device_name}`}
          />
        ))}
      </div> */}
    </div>
  )
}
