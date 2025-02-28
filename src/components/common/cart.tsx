"use client"
import React from "react"
import { Cart } from "./icons"
import { DeviceWithQty, getCart } from "@/server/api/cartActions"
import { useQuery } from "@tanstack/react-query"

function CartCount() {
  const {
    data: cart,
    // isPending,
    // error,
  } = useQuery({ queryKey: ["get-cart"], queryFn: getCart })

  const totalQty: number | undefined = cart?.items.reduce(
    (acc: number, item: DeviceWithQty) => acc + item?.quantity,
    0
  )

  // if (isPending) return <></>
  // console.log(cart, "cart")

  // if (error)
  //   return (
  //     <p className="text-red-500">
  //       Error {error.name} {error.message}{" "}
  //     </p>
  //   )
  return (
    <>
      <div className="size-3.5 absolute -top-0.5 -right-1 rounded-full bg-[#0075EB] font-gilroyMedium text-white flex justify-center items-center text-[10px]">
        {totalQty}
      </div>
      <Cart className="size-6" />
    </>
  )
}

export default CartCount
