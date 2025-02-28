"use client"

import { DeviceWithQty, updateCartItemQuantity } from "@/server/api/cartActions"
import { Device } from "@/server/api/productActions"
import { useQueryClient } from "@tanstack/react-query"
import { Minus, Plus } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const ProductSection = ({ data }: { data: DeviceWithQty[] }) => {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const type = pathname.includes("checkout") ? "address" : ""

  // Manage quantities locally for each item
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    data?.reduce(
      (acc, product) => ({ ...acc, [product?._id]: product.quantity }),
      {}
    )
  )

  useEffect(() => {
    const res = data?.reduce(
      (acc, product) => ({ ...acc, [product?._id]: product.quantity }),
      {}
    )
    setQuantities(res)
  }, [data])

  const handleAddToCart = async (device: DeviceWithQty) => {
    const availableQty = device?.qty ?? 0 // Get available quantity from API
    const newQuantity = (quantities[device._id] ?? 0) + 1 // Calculate new quantity

    if (newQuantity > availableQty) {
      console.log("Not enough stock available.")
      return
    }

    setQuantities((prev) => ({ ...prev, [device._id]: newQuantity }))
    await updateCartItemQuantity(device._id, newQuantity)
    queryClient.refetchQueries({
      queryKey: ["get-cart"],
    })
    // router.refresh()
  }

  const handleRemoveFromCart = async (device: DeviceWithQty) => {
    const newQuantity = Math.max((quantities[device._id] ?? 0) - 1, 0)

    setQuantities((prev) => ({ ...prev, [device._id]: newQuantity }))
    await updateCartItemQuantity(device._id, newQuantity)
    queryClient.refetchQueries({
      queryKey: ["get-cart"],
    })
    // router.refresh()
  }

  return (
    <>
      {data?.map((product) => (
        <React.Fragment key={product._id}>
          {/* MOBILE VIEW  */}

          <section className="flex flex-col sm:hidden" key={product._id}>
            <div className="flex flex-row gap-2">
              <div className="bg-[#F7F8FA] py-5 px-1 rounded-[6px]">
                <img
                  src={product.image[0].url ?? "/media/product-img/dell1.png"}
                  alt="Product"
                  width={79}
                  height={79}
                />
              </div>
              <div className="flex flex-col justify-between flex-grow py-0.5">
                <p className="text-lg tracking-[-0.4px] font-gilroySemiBold">
                  {product.device_name}
                </p>
                <p className="text-sm font-gilroyMedium text-[#AFAFAF] flex gap-1">
                  <span>{product.storage ?? "-"}</span>
                  {" . "}
                  <span>{product.ram ?? "-"}</span>
                  {" . "}
                  <span>{product.processor ?? "-"}</span>
                </p>

                <div className="flex justify-between items-center w-full">
                  <div>
                    <div className="flex items-center border border-[#A2A3B1] rounded-[9px] px-3 py-1 gap-5">
                      <Minus onClick={() => handleRemoveFromCart(product)} />
                      <span>{quantities[product?._id] ?? 1}</span>
                      <Plus onClick={() => handleAddToCart(product)} />
                    </div>
                  </div>
                  <h1 className="text-black font-gilroyBold text-lg">
                    ₹{product?.quantity * product?.payable}
                  </h1>
                </div>
              </div>
            </div>
          </section>
          {/* WEB VIEW */}
          <section
            className={`flex bg-white px-4 py-3 rounded-2xl gap-5 sm:w-[90%] md:w-[85%] lg:w-[78%] max-sm:hidden ${
              type === "address" && "lg:w-full md:w-full sm:w-full"
            }`}
          >
            <div className="bg-[#F7F8FA] rounded-[8.59px] px-2 py-3 flex justify-center items-center">
              <img
                src={product.image?.[0]?.url ?? "/media/product-img/dell1.png"}
                alt="Product"
                width={113}
                height={75}
              />
            </div>

            <div className="flex flex-col w-full justify-around">
              <p className="flex justify-between items-center">
                <span className="text-black 2xl:text-lg text-base font-gilroySemiBold">
                  {product.device_name}
                </span>
                <span className="flex gap-1 items-center leading-[23.887px]">
                  <span className="text-[#C5C5C5] text-base font-gilroySemiBold">
                    {quantities[product._id]}x
                  </span>
                  <span className="2xl:text-xl text-lg text-black font-gilroySemiBold">
                    ₹{product?.quantity * product?.payable}
                  </span>
                </span>
              </p>

              <p className="w-full relative flex items-start">
                <span className="text-[#AFAFAF] font-gilroyMedium text-xs leading-[23.87px]">
                  {product.color ?? "color"}
                </span>
                {type !== "address" &&
                  (product?.qty > 0 ? (
                    <span className="text-xs absolute right-0 font-gilroySemiBold text-[#2E8016] px-3 md:-mt-2 sm:-mt-3 lg:mt-1 py-1.5 mt-1 rounded-[13.92px] bg-[#E0F9E7]">
                      In-Stock
                    </span>
                  ) : (
                    <span className="text-xs absolute right-0 font-gilroySemiBold text-red-500 px-3 md:-mt-2 sm:-mt-3 lg:mt-1 py-1.5 mt-1 rounded-[13.92px] bg-red-100">
                      Out-of-Stock
                    </span>
                  ))}
              </p>

              <p className="text-xs font-gilroyMedium text-[#AFAFAF] flex gap-1">
                <span>{product?.storage ?? "-"}</span>
                {" . "}
                <span>{product?.ram ?? "-"}</span>
                {" . "}
                <span>{product?.processor ?? "-"}</span>
              </p>

              {type !== "address" ? (
                <div className="w-fit mt-2">
                  <div className="flex items-center border border-[#A2A3B1] rounded-[2.592px] px-3 py-1 gap-5">
                    <Minus
                      className="cursor-pointer"
                      onClick={() => handleRemoveFromCart(product)}
                    />
                    <span className="font-gilroySemiBold text-[#17183B]">
                      {quantities[product._id] ?? 1}
                    </span>
                    <Plus
                      className="cursor-pointer"
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </div>
              ) : product?.qty > 0 ? (
                <span className="text-xs w-fit right-0 font-gilroySemiBold text-[#2E8016] px-3 py-1.5 mt-1 rounded-[13.92px] bg-[#E0F9E7]">
                  In-Stock
                </span>
              ) : (
                <span className="text-xs w-fit right-0 font-gilroySemiBold text-[#D32F2F] px-3 py-1.5 mt-1 rounded-[13.92px] bg-[#F9E0E0]">
                  Out-of-Stock
                </span>
              )}
            </div>
          </section>
        </React.Fragment>
      ))}
    </>
  )
}

export default ProductSection
