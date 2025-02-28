import React from "react"
import CartMain from "./_component/cart-main"
import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

const CartPage = async () => {
  const sess = await auth()
  if (!sess) {
    redirect("/login?returnUrl=/cart")
  }
  return <CartMain />
}

export default CartPage
