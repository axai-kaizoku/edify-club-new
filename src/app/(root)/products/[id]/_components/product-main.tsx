"use client"
import React, { useEffect, useRef, useState } from "react"
import { useScroll, motion, useTransform } from "framer-motion"
import { Container } from "@/components/common/container"
import { gql, useQuery } from "@apollo/client"
import { DeviceSecx } from "./device-secx"
import IntroVideo from "./intro-video"
import { DeviceDetailedSecx } from "./device-detail-secx"
import { ReviewsSecx } from "./review-secx"
import { FAQ } from "./faq"
import { RecentlyViewed } from "./recently-viewed"
import { SimilarProducts } from "./similar-products"
import { useQuery as useTanQuery } from "@tanstack/react-query"
import { getCart } from "@/server/api/cartActions"
import SkeletonLoader from "./product-skeleton"

interface ProductPageProps {
  id: string
}

function Products({ id }: ProductPageProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref })

  // Scale down video
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0])
  const { data: cart } = useTanQuery({
    queryKey: ["get-cart"],
    queryFn: getCart,
  })
  // State to track scroll pause
  const [isScrollPaused, setIsScrollPaused] = useState(true)

  useEffect(() => {
    if (isScrollPaused) {
      document.body.style.overflow = "hidden" // Pause scroll
      setTimeout(() => {
        setIsScrollPaused(false)
        document.body.style.overflow = "auto" // Resume scroll
      }, 3000) // Adjust time as needed
    }
  }, [isScrollPaused])

  const GET_PRODUCT = gql`
    query {
      products(where: { _id: "${id}" }) {
        _id
        device_name
        color
        image
        latest_release
        brand
        ram
        processor
        storage
        perfectFor
        device_condition
        display_size
        deviceFeatures
        description
        config
        qty
        is_trending
        payable
        similarProducts {
          device_name
          brand
          id
          purchase_value
          storage
          ram
          payable
          description
          image
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

  const { loading, error, data } = useQuery(GET_PRODUCT)

  if (loading) return <SkeletonLoader/>
  if (error)
    return (
      <div className="text-red-600 text-center">Error: {error.message}</div>
    )

  console.log(data.products[0])

  return (
    <>
      <Container ref={ref}>
        <DeviceSecx data={data.products[0]} cart={cart!} />
        <motion.div style={{ scale }}>
          <IntroVideo />
        </motion.div>
        <DeviceDetailedSecx data={data.products[0]} />
        <SimilarProducts data={data.products[0].similarProducts} />
        {/* <RecentlyViewed /> */}
        <ReviewsSecx data={data.products[0]} />
        <FAQ />
      </Container>
    </>
  )
}

export default Products
