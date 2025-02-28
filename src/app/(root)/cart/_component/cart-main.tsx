"use client"
import { Container } from "@/components/common/container"
import React from "react"
import CartIcons from "./icons"
import ProductSection from "./product-section"
import { useRouter } from "next/navigation"
import { CouponsModal } from "./coupon-modal"
import { CouponCard } from "./coupon-card"
import { coupons } from "./utils"
import { DeviceWithQty, getCart } from "@/server/api/cartActions"
import { useQuery } from "@tanstack/react-query"
import SkeletonLoader from "./cart-skeleton-loader"
const CartMain = () => {
  const router = useRouter()
  const [selectedCoupon, setSelectedCoupon] = React.useState<string | null>(
    null
  )
  const {
    data: cart,
    isLoading,
    error,
  } = useQuery({ queryKey: ["get-cart"], queryFn: getCart })

  if(isLoading){
    return <SkeletonLoader/>
  }
  const totalQty: number = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.quantity,
    0
  )

  const totalPrice: number = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item.payable * item.quantity,
    0
  )
  // Find the applied coupon
  const appliedCoupon = coupons.find((coupon) => coupon.code === selectedCoupon)

  // Calculate the discount amount
  const discountAmount = appliedCoupon
    ? (totalPrice * appliedCoupon.discountValue) / 100
    : 0

  // Final payable amount after discount
  const finalTotal = totalPrice - discountAmount

  // console.log(cart, "cart")

  if (error)
    return (
      <p className="text-red-500">
        Error {error.name} {error.message}{" "}
      </p>
    )

  function handleCouponSelect(code: string): void {
    setSelectedCoupon(code)
  }
  return (
    <>
      {/* MOBILE VIEW */}
      <Container className="flex flex-col mt-2 gap-6 sm:hidden">
        <div className="flex items-center">
          <CartIcons.back_icon />
          <p className="font-gilroySemiBold text-xl flex-grow text-center pr-9 text-black">
            Cart
          </p>
        </div>

        <ProductSection data={cart.items} />

        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center border border-[#DBDDE3] rounded-2xl overflow-hidden px-4 gap-2 py-3">
            <CartIcons.coupon_icon />
            <input
              className="outline-none border-none flex-grow"
              placeholder="Discount Code"
            />
            <span className="text-base text-[#B6B6B6] font-gilroySemiBold cursor-pointer">
              Apply
            </span>
          </div>

          <div className="flex flex-col gap-[14px] px-4">
            <div className="flex justify-between items-center text-base font-gilroyMedium">
              <span>Price</span>
              <span>₹ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-base font-gilroyMedium">
              <span>Shipping</span>
              <span className="text-[#2E8016]">Free</span>
            </div>

            <div className="h-[1px] bg-[#EDEDED]"></div>

            <div className="flex justify-between items-center text-base font-gilroyMedium">
              <span>TOTAL</span>
              <span className="font-gilroyBold tracking-[0.1px] text-[#17183B]">
                ₹{finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            router.push("/cart/checkout")
          }}
          className="bg-black text-white text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] -mt-2 mb-2"
        >
          CheckOut
        </button>
      </Container>

      {/* WEB VIEW */}

      <section className="flex max-sm:hidden">
        <div className="md:w-[50%] sm:w-[50%] lg:w-[60%] bg-[#F7F8FA] h-screen">
          <div className="flex flex-col gap-5 mt-12">
            <div className="flex gap-4 items-center lg:mx-10 md:mx-4 sm:mx-4 max-sm:hidden">
              <CartIcons.laptop_back_icon
                className="cursor-pointer"
                onClick={() => router.back()}
              />
              <div className="font-gilroySemiBold text-black text-2xl 2xl:text-3xl">
                Cart
                <span className="text-sm 2xl:text-base text-[#A2A3B1] font-gilroySemiBold ml-2">
                  {totalQty} Items
                </span>
              </div>
            </div>

            <section className="w-full flex flex-col items-center gap-3">
              <ProductSection data={cart.items} />
            </section>
          </div>
        </div>

        <div className="md:w-[50%] sm:w-[50%] lg:w-[40%] bg-white flex justify-center">
          <div className="2xl:w-[61.2%] xl:w-[70%] lg:w-[80%] md:w-[88%] sm:w-[92%] h-fit mt-12 p-5 gap-4">
            <h1 className="text-lg font-gilroySemiBold leading-[18.191px] tracking-[0.091px]">
              Product Summary
            </h1>

            <div className="flex flex-col gap-7 pt-9">
              <div className="flex flex-col gap-6">
                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    Price
                  </span>
                  <span className="text-base leading-[24px] font-gilroyMedium">
                    ₹ {totalPrice.toFixed(2)}
                  </span>
                </p>
                {/* <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    Discount
                  </span>
                  <span className="text-base leading-[24px] font-gilroyMedium text-[#2E8016]">
                    ₹31.9
                  </span>
                </p> */}
                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    Shipping
                  </span>
                  <span className="text-base leading-[24px] font-gilroyMedium text-[#2E8016]">
                    Free
                  </span>
                </p>
                {/* <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    Coupon Applied
                  </span>
                  <span className="text-base leading-[24px] font-gilroyMedium text-[#2E8016]">
                    {appliedCoupon ? `-₹{discountAmount.toFixed(2)}` : "₹0.00"}
                  </span>
                </p> */}
              </div>

              <div className="h-[1px] bg-[#D1D1D8]"></div>

              <div className="flex flex-col gap-6">
                {/* <div className="flex items-center border border-black rounded-[8px] overflow-hidden px-4 gap-2 py-3">
                  <p>
                    <CartIcons.coupon_black_icon />
                  </p>
                  <input
                    className="outline-none border-none placeholder:text-black placeholder:font-gilroyRegular text-black flex-grow"
                    placeholder="Discount Code"
                    value={selectedCoupon}
                  />
                  <CouponsModal
                    triggerLabel={
                      <span className="text-base text-[#B6B6B6] font-gilroySemiBold cursor-pointer">
                        Apply
                      </span>
                    }
                    content={
                      <div className="flex flex-col gap-4">
                        {coupons.map((coupon, index) => (
                          <CouponCard
                            coupon={coupon}
                            key={index}
                            selected={selectedCoupon === coupon?.code}
                            onClick={() => handleCouponSelect(coupon?.code)}
                          />
                        ))}
                      </div>
                    }
                    onApply={() => {}}
                    selectedCouponCode={selectedCoupon || ""}
                  />
                </div> */}

                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    TOTAL
                  </span>
                  <span className="text-base leading-[20px] font-gilroySemiBold tracking-[0.1px]">
                    ₹{finalTotal}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroyMedium leading-[24px]">
                    Estimated Delivery by
                  </span>
                  <span className="text-base leading-[20px] font-gilroySemiBold tracking-[0.1px]">
                    01 Feb, 2024
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => {
                    router.push("/cart/checkout/address")
                  }}
                  className="bg-black text-white text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] "
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CartMain
