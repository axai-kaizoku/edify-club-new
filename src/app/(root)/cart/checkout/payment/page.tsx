"use client"
import React, { useEffect, useState } from "react"
import ProductSection from "@/app/(root)/cart/_component/product-section"
import CartIcons from "../../_component/icons"
import { useRouter } from "next/navigation"
import PaymentIcons from "./_components/icons"
import AddressIcons from "../address/_components/icons"
import { createOrderId, DeviceWithQty, getCart } from "@/server/api/cartActions"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

const PARTIAL_AMOUNT = 500

interface PaymentMethodCardProps {
  title: string
  icons?: React.ReactNode[]
  onClick?: () => void
  className?: string
  key?: string
}
const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  title,
  icons,
  onClick,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border border-[#E1E1E1] rounded-xl px-4 py-3",
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-col gap-3 justify-start">
        <h1 className="text-lg font-gilroySemiBold">{title}</h1>
        <div className="flex gap-3">
          {icons?.map((icon, index) => (
            <span key={index}>{icon}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
function PaymentOptions() {
  const router = useRouter()

  const [next, setNext] = useState(0)

  const [banking, setBanking] = useState("card")

  const {
    data: cart,
    isPending,
    error,
  } = useQuery({ queryKey: ["get-cart"], queryFn: getCart })

  const totalPrice: number = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.payable * item.quantity,
    0
  )

  const totalQty: number = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.quantity,
    0
  )

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
  }, [])

  const handleSubmit = async () => {
    console.log({ totalPrice, totalQty })
    // const formData = new FormData(e.currentTarget);
    // const method = formData.get('payment'); // Get the selected payment method
    let finalPrice: number
    if (banking === "cod") {
      finalPrice = PARTIAL_AMOUNT * totalQty
    } else {
      finalPrice = totalPrice
    }

    const res: any = await createOrderId(finalPrice, banking)
    console.log(res)
    const razorpayOrderId = res?.cart?.razorpay_order_id
    const razorpayPrice = res?.cart?.totalPrice

    handlePayment(razorpayOrderId, razorpayPrice)
    router.refresh()
  }

  const handlePayment = (orderId: string, totalPrice: number) => {
    const options = {
      key: "rzp_test_F05ke1JEbCqXlE", // Use your test/live key here
      amount: totalPrice, // Amount in paise
      currency: "INR",
      name: "Edify",
      description: "Order Payment",
      image:
        "https://media.glassdoor.com/sqll/2268419/winuall-squarelogo-1562701582366.png",
      order_id: orderId, // Razorpay order ID from query parameter
      handler: function (response: any) {
        if (response?.razorpay_payment_id) {
          router.refresh()
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9090909090",
      },
      theme: {
        color: "#F37254",
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1?.open()
  }

  const handlePaymentButton = () => {
    console.log("next", next)
    console.log("banking", banking)
    if (next === 0) {
      setNext(1)
    } else if (next === 1) {
      handleSubmit()
    }
  }

  const paymentMethods = {
    card: {
      title: "Debit and Credit Card",
      icons: [
        <PaymentIcons.master_card key="mc" />,
        <PaymentIcons.visa key="visa" />,
        <PaymentIcons.rupay key="rupay" />,
        <PaymentIcons.discover key="discover" />,
      ],
    },
    netbanking: {
      title: "Netbanking",
      icons: [
        <PaymentIcons.sbi className="border rounded-md" key="sbi" />,
        <PaymentIcons.hdfc className="border rounded-md" key="hdfc" />,
        <PaymentIcons.hsbc className="border rounded-md" key="hsbc" />,
        <PaymentIcons.axis className="border rounded-md" key="axis" />,
        <span className="text-xs font-gilroySemiBold" key="more">
          {" "}
          &more
        </span>,
      ],
    },
    wallet: {
      title: "Wallets",
      icons: [
        <PaymentIcons.amazon_pay key="amazon" />,
        <PaymentIcons.paypal key="paypal" />,
        <PaymentIcons.mobikwik key="mobikwik" />,
        <span className="text-xs font-gilroySemiBold" key="more">
          {" "}
          &more
        </span>,
      ],
    },
    upi: {
      title: "UPI",
      icons: [
        <PaymentIcons.gpay key="gpay" />,
        <PaymentIcons.phone_pay key="phonepay" />,
        <PaymentIcons.cred key="cred" />,
        <PaymentIcons.amazon_pay_payment
          className="border rounded-md"
          key="amazonpay"
        />,
        <span className="text-xs font-gilroySemiBold" key="more">
          {" "}
          &more
        </span>,
      ],
    },
    cod: {
      title: "Cash On Delivery",
      icons: [
        <h1 key="cod" className="text-lg font-gilroyMedium text-[#B6B6B6] ">
          Pay{" "}
          <span className="text-xl text-black font-gilroySemiBold">₹634</span>{" "}
          now, rest on delivery!
        </h1>,
      ],
    },
  }

  return (
    <section className="flex max-sm:hidden h-full justify-between">
      {/* LEFT SECTION */}
      <div className="md:w-[50%] sm:w-[50%] lg:w-[48%] bg-white h-full">
        <div className="flex flex-col gap-5 mt-8">
          <div className="flex gap-4 items-center lg:mx-10 md:mx-4 sm:mx-4 max-sm:hidden">
            <CartIcons.laptop_back_icon
              className="cursor-pointer"
              onClick={() => {
                if (next !== 0) {
                  setNext(0)
                } else {
                  router.back()
                }
              }}
            />
            {next === 0 ? (
              <div className="font-gilroySemiBold text-black text-2xl 2xl:text-3xl">
                Payment methods
                <span className="text-sm 2xl:text-base text-[#A2A3B1] font-gilroySemiBold ml-2"></span>
              </div>
            ) : (
              <div className="font-gilroySemiBold text-black text-2xl 2xl:text-3xl">
                Summary
                <span className="text-sm 2xl:text-base text-[#A2A3B1] font-gilroySemiBold ml-2"></span>
              </div>
            )}
          </div>
          {/* Content */}
          {next === 0 ? (
            <div className="flex flex-col ml-24">
              <div className="flex flex-col gap-4">
                {Object.keys(paymentMethods).map((key) => (
                  <PaymentMethodCard
                    key={key}
                    className={cn(banking === key ? "border border-black" : "")}
                    onClick={() => setBanking(key)}
                    title={paymentMethods[key].title}
                    icons={paymentMethods[key].icons}
                  />
                ))}
                <div className="rounded-xl flex gap-3 items-center px-4 py-3 bg-[#E7F6EF] text-sm font-gilroyRegular">
                  <PaymentIcons.safety_tick />{" "}
                  <span>
                    We adhere entirely to the data security standards of the
                    payment industry.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col ml-24 gap-y-8">
              <div className="flex flex-col gap-y-4">
                <h1 className="text-xl font-gilroySemiBold">
                  Delivery Address
                </h1>
                <label key={cart?.addressDetails._id} className="relative">
                  <input
                    type="radio"
                    name="radioOptions"
                    value={cart?.addressDetails._id}
                    // checked={selected === option._id}
                    // onChange={() => setSelected(option._id)}
                    className="hidden"
                  />
                  <div
                    className={`p-2 pr-4 border rounded-[10px] gap-3 flex items-center transition-all border-black`}
                  >
                    <div className="relative">
                      <AddressIcons.location_icon className="absolute left-[35%] top-[35%]" />

                      <img
                        src="/media/map.webp"
                        alt="map"
                        width={78.08}
                        height={81.425}
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-2 w-full">
                      <div className="flex items-center">
                        <p className="text-xl text-[#1A1A1A] font-gilroySemiBold">
                          {cart?.addressDetails.address}
                        </p>

                        <span className="text-xs w-fit right-0 font-gilroySemiBold text-[#2E8016] px-3 ml-6  py-1 rounded-[13.92px] bg-[#E0F9E7]">
                          {cart?.addressDetails?.isPrimary
                            ? "Primary"
                            : "Secondary"}
                        </span>

                        <p className="text-sm opacity-0 flex-grow text-right font-gilroySemiBold leading-[20px] text-[#17183B]">
                          Edit
                        </p>
                      </div>
                      <p className="text-base text-[#17183B] font-gilroyMedium">
                        {cart?.addressDetails?.address}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex flex-col gap-y-4">
                <h1 className="text-xl font-gilroySemiBold">Payment Method</h1>
                <PaymentMethodCard
                  title={paymentMethods[banking].title}
                  icons={paymentMethods[banking].icons}
                />
              </div>
            </div>
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
            <ProductSection data={cart?.items} />
          </section>

          <div className="flex flex-col gap-6">
            {next === 1 && banking === "cod" ? (
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

                <div className="w-full h-[1px] border " />

                <p className="flex justify-between items-center">
                  <span className="text-base font-gilroySemiBold leading-normal text-black">
                    Partial Payable
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold">
                    ₹ {PARTIAL_AMOUNT * totalQty}
                  </span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="text-sm font-gilroyRegular leading-normal text-[#818EA1]">
                    Remaining COD ammount
                  </span>
                  <span className="text-sm leading-normal font-gilroySemiBold text-[#818EA1]">
                    ₹ {totalPrice - PARTIAL_AMOUNT * totalQty}
                  </span>
                </p>
              </div>
            ) : (
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
            )}
          </div>

          <button
            type="button"
            onClick={handlePaymentButton}
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
  )
}

export default PaymentOptions
