"use client"
import CartIcons from "@/app/(root)/cart/_component/icons"
import StoreProductIcons from "@/app/(root)/products/[id]/_components/store-icons"
import { Container } from "@/components/common/container"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import AddressIcons from "./icons"
import Drawer from "@/components/ui/bottom-drawer"
import NewAddressForm from "./new-address-form"
import { CouponsModal } from "@/app/(root)/cart/_component/coupon-modal"
import { coupons } from "@/app/(root)/cart/_component/utils"
import { CouponCard } from "@/app/(root)/cart/_component/coupon-card"
import ProductSection from "@/app/(root)/cart/_component/product-section"
import AllAddresses from "./all-address"
// import { AddressOptions } from "./utils"
import {
  createOrderId,
  DeviceWithQty,
  getCart,
  updateCartAddress,
} from "@/server/api/cartActions"

import { useQuery } from "@tanstack/react-query"
import { getAddress } from "@/server/api/addressActions"
import AddressSkeletonLoader from "./address-skeleton"
const AddressMain = () => {
  const router = useRouter()
  // const [selected, setSelected] = useState("")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedCoupon, setSelectedCoupon] = React.useState<string | null>(
    null
  )

  const {
    data: cart,
    isPending,
    isLoading,
    error,
  } = useQuery({ queryKey: ["get-cart"], queryFn: getCart })

  const totalPrice: number = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.payable * item.quantity,
    0
  )

  const { data: addresses } = useQuery({
    queryKey: ["all-address"],
    queryFn: getAddress,
  })

  const [selected, setSelected] = useState(
    addresses?.find((option) => option.isPrimary)?._id || addresses?.[0]?._id
  )

  function handleCouponSelect(code: string): void {
    setSelectedCoupon(code)
  }

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    terms: false,
  })

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    country: "",
    state: "",
    zip: "",
    city: "",
    address: "",
    // terms: "",
  })

  const validateForm = () => {
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^[0-9]{10}$/

    const newErrors = {
      fullName: formData.fullName ? "" : "Name is required",
      country: formData.country ? "" : "Country name is required",
      // terms: formData.terms ? "" : "You need to accept the Terms and Condition",
      state: formData.state ? "" : "State is required",
      city: formData.city ? "" : "City name is required",
      zip: formData.zip ? "" : "Zip is required",
      // email: formData.email
      //   ? emailRegex.test(formData.email)
      //     ? ""
      //     : "Invalid email format"
      //   : "Email is required",
      phone: formData.phone
        ? phoneRegex.test(formData.phone)
          ? ""
          : "Phone number must be 10 digits"
        : "Phone number is required",
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }))

    return !Object.values(newErrors).some((err) => err)
  }

  const MobileValidateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^[0-9]{10}$/

    const newErrors = {
      fullName: formData.fullName ? "" : "Name is required",
      // country: formData.country ? "" : "Country name is required",
      // terms: formData.terms ? "" : "You need to accept the Terms and Condition",
      // state: formData.state ? "" : "State is required",
      // city: formData.city ? "" : "City name is required",
      address: formData.address ? "" : "Address is required",
      zip: formData.zip ? "" : "Zip is required",
      // email: formData.email
      //   ? emailRegex.test(formData.email)
      //     ? ""
      //     : "Invalid email format"
      //   : "Email is required",
      phone: formData.phone
        ? phoneRegex.test(formData.phone)
          ? ""
          : "Phone number must be 10 digits"
        : "Phone number is required",
    }

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }))

    return !Object.values(newErrors).some((err) => err)
  }

  const proceedToPayment = () => {
    console.log(selected, "se")
    updateCartAddress(selected!).then()
    router.push("/cart/checkout/payment")
  }

  if (isLoading) return <AddressSkeletonLoader/>
  // console.log(cart, "cart")

  if (error)
    return (
      <p className="text-red-500">
        Error {error.name} {error.message}{" "}
      </p>
    )

  return (
    <>
      {/* MOBILE View */}
      <Container className="flex flex-col my-2 gap-6 sm:hidden">
        <div className="flex items-center">
          <CartIcons.back_icon
            className="cursor-pointer"
            onClick={() => {
              router.back()
            }}
          />
          <p className="font-gilroySemiBold text-xl flex-grow text-center pr-9 text-black">
            Address
          </p>
        </div>

        <div className="flex flex-col gap-[10px]">
          {addresses?.map((option) => (
            <label key={option._id} className="relative cursor-pointer">
              <input
                type="radio"
                name="radioOptions"
                value={option._id}
                checked={selected === option._id}
                onChange={() => setSelected(option._id)}
                className="hidden"
              />
              <div
                className={`py-2 pl-2 border rounded-[10px] gap-3 flex items-center transition-all justify-between ${
                  selected === option._id
                    ? "border-black"
                    : "border-[#C7C7C7] bg-white"
                }`}
              >
                <div className="flex gap-3 items-center">
                  {selected === option._id ? (
                    <CartIcons.map_selected_icon />
                  ) : (
                    <img src="/media/map.webp" alt="map" />
                  )}

                  <div className="flex flex-col justify-around">
                    <p className="text-sm text-[#1A1A1A] font-gilroySemiBold">
                      {option.title}
                    </p>
                    <p className="text-sm text-[#808080]">
                      {option?.address?.substring(0, 29)}...
                    </p>
                  </div>
                </div>

                <div className="mr-5">
                  <AddressIcons.edit_icon className="cursor-pointer" />
                </div>
              </div>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setIsDrawerOpen(true)
          }}
          className="bg-white text-black border-[1.5px] border-black text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] -mt-1 mb-2"
        >
          Add Address
        </button>

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Add Address"
            className="bg-white"
          >
            <NewAddressForm
              setIsDrawerOpen={setIsDrawerOpen}
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              setPage={setPage}
              validateForm={MobileValidateForm}
            />
          </Drawer>
        )}

        <div className="flex-grow"></div>

        <div className="gap-[12px] flex flex-col">
          <p className="text-xs font-gilroySemiBold text-center">
            100% Secure Payments
          </p>
          <div className="flex mx-auto -mt-2">
            <StoreProductIcons.visa />
            <StoreProductIcons.google_pay />
            <StoreProductIcons.apple_pay />
            <StoreProductIcons.mastercard />
            <StoreProductIcons.amex />
          </div>

          <button
            type="button"
            onClick={() => {
              router.push("/cart/checkout")
            }}
            className="bg-black text-white text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] "
          >
            Proceed
          </button>
        </div>
      </Container>

      {/* Web View */}

      <section className="flex max-sm:hidden h-full">
        {/* LEFT SECTION */}
        <div className="md:w-[50%] sm:w-[50%] lg:w-[55%] bg-white h-full">
          <div className="flex flex-col gap-5 mt-8">
            <div className="flex gap-4 items-center lg:mx-10 md:mx-4 sm:mx-4 max-sm:hidden">
              <CartIcons.laptop_back_icon
                className="cursor-pointer"
                onClick={() => {
                  if (page > 1) {
                    setPage((prev) => prev - 1)
                  } else {
                    router.back()
                  }
                }}
              />
              <div className="font-gilroySemiBold text-black text-2xl 2xl:text-3xl">
                Address
                <span className="text-sm 2xl:text-base text-[#A2A3B1] font-gilroySemiBold ml-2"></span>
              </div>
            </div>
            {/* Content */}

            {page === 1 ? (
              <AllAddresses
                selected={selected}
                setSelected={setSelected}
                setPage={setPage}
                allAddresses={addresses ?? []}
              />
            ) : (
              <NewAddressForm
                page={page}
                setPage={setPage}
                setIsDrawerOpen={setIsDrawerOpen}
                errors={errors}
                formData={formData}
                setFormData={setFormData}
                validateForm={validateForm}
              />
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div className="md:w-[50%] sm:w-[50%] lg:w-[45%] bg-[#F7F8FA] flex justify-center">
          <div className="2xl:w-[75.2%] xl:w-[80%] lg:w-[85%] md:w-[90%] sm:w-[92%] flex flex-col h-fit mt-8 p-5 gap-4">
            <h1 className="text-lg font-gilroySemiBold leading-[18.191px] tracking-[0.091px]">
              Product Information & Review
            </h1>

            <section className="w-full flex flex-col gap-3 pt-1">
              <ProductSection data={cart.items} />
            </section>

            <div className="flex flex-col gap-6">
              {/* <div className="flex items-center border border-[#DBDDE3] rounded-[8px] bg-white overflow-hidden px-4 gap-2 py-3">
                <p>
                  <CartIcons.coupon_black_icon />
                </p>
                <input
                  className="outline-none border-none placeholder:text-black placeholder:font-gilroyRegular text-black flex-grow"
                  placeholder="Discount Code"
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

              <div className="flex flex-col gap-4">
                <p className="flex justify-between items-center">
                  <span className="text-sm font-gilroyRegular leading-normal text-[#818EA1]">
                    Subtotal
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold">
                    ₹ {totalPrice}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-sm font-gilroyRegular leading-normal text-[#818EA1]">
                    Discount
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold">
                    ₹0
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-sm font-gilroyRegular leading-normal text-[#818EA1]">
                    Shipping
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold text-green-600">
                    Free
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroySemiBold leading-normal text-black">
                    Total
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold">
                    ₹ {totalPrice}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={proceedToPayment}
              className="bg-black text-white text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] mt-6"
            >
              Proceed
            </button>

            <p className="flex gap-2">
              <AddressIcons.lock_icon />
              <span className="text-black text-base font-gilroySemiBold">
                100% Secured Payments
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddressMain
