import React from "react"
import Products from "./_components/product-main"
// import { addRecentlyViewed } from "@/server/api/productActions"

interface ProductPageProps {
  params: { id: string }
}

const page = async ({ params }: ProductPageProps) => {
  // await addRecentlyViewed(params.id)
  return (
    <div>
      <Products id={params.id} />
    </div>
  )
}

export default page
