import { productsMockData } from "@/app/(root)/_components/best-sellers/best-sellers"
import { ProductCard } from "@/components/common/product-card"
import { Device } from "@/server/api/productActions"

export const SimilarProducts = ({ data }: { data: Device }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center my-2 lg:my-6">
      <h3 className="font-orange text-2xl lg:text-4xl mt-5 lg:mt-1 mb-4 lg:mb-6">
        Similar Products
      </h3>
      <div className="flex flex-wrap justify-around items-center w-full h-full lg:px-3 mb-2 lg:mb-8">
        {data?.slice(0, 4).map((product, i) => (
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
