// 'use server';
import { AxiosError } from "axios"

import { cache } from "react"
import { Device } from "./productActions"
import { callAPIWithToken } from "../helper"

export type DeviceWithQty = Device & { quantity: number }

export type Cart = {
  userId: string
  orgId: string
  addressId: string
  items: DeviceWithQty[]
  totalPrice: number
  status: string
  addressDetails: {
    _id: string
    userId: string
    orgId: string
    address?: string
    city: string
    isPrimary: boolean
    deleted_at: string | null
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export async function addItemToCart(itemId: string, quantity: number) {
  try {
    const payload = {
      item: {
        itemId: itemId,
        quantity: quantity,
      },
    }
    const apiUrl = "https://api.edify.club/edifyweb-backend/v1/cart/addItem"

    const response = await callAPIWithToken(apiUrl, "POST", payload)
    console.log(response.data, "ITEM ADDED TO CART")
    return response?.data
  } catch (error: any) {
    throw new Error(error?.response || "Failed to add item to cart.")
  }
}

export const getCart = cache(async function () {
  try {
    const response = await callAPIWithToken<Cart>(
      `https://api.edify.club/edifyweb-backend/v1/cart`,
      "GET"
    )

    return response?.data // Return the cart data
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch cart")
  }
})

export const updateCartItemQuantity = async (
  itemId: string,
  quantity: number
): Promise<void> => {
  try {
    const response = await callAPIWithToken<any>(
      `https://api.edify.club/edifyweb-backend/v1/cart/item/quantity`,
      "PATCH",
      { itemId: itemId, quantity: quantity }
    )
  } catch (error) {
    throw new Error((error as AxiosError)?.message)
  }
}

export const removeItemFromCart = async (itemId: string): Promise<void> => {
  try {
    // Make the DELETE request to remove the item from the cart
    await callAPIWithToken(
      `https://api.edify.club/edifyweb-backend/v1/cart/item`,
      "DELETE",
      { itemId }
    )
  } catch (error) {
    throw new Error((error as AxiosError)?.message)
  }
}

// Update Cart Address
export const updateCartAddress = async (addressId: string): Promise<void> => {
  try {
    const response = await callAPIWithToken<any>(
      `https://api.edify.club/edifyweb-backend/v1/cart/address`,
      "PATCH",
      { addressId }
    )
    console.log(response, "update cart address")
    return response?.data
  } catch (error) {
    throw new Error((error as AxiosError)?.message)
  }
}

export const getPaymentMethods = async (price: number) => {
  // const sess = await auth() // Fetch session details

  try {
    // if (sess?.user && sess?.user?.user._id) {
    // Fetch Cart data
    const response = await callAPIWithToken<any>(
      `https://api.edify.club/edifyweb-backend/v1/payments/methods?amount=${price}`,
      "GET"
    )

    return response?.data // Return the cart data
    // } else {
    //   throw new Error("No user session found")
    // }
  } catch (error: any) {
    throw new Error(error?.message || "Failed to fetch payment methods")
  }
}

export async function createOrderId(amount: number, paymentOption: string) {
  try {
    const payload = {
      amount,
      paymentOption,
    }
    const apiUrl =
      "https://api.edify.club/edifyweb-backend/v1/payments/initiate"

    const response = await callAPIWithToken(apiUrl, "POST", payload)
    console.log(response.data, "initiate")
    //@ts-expect-error payload data
    const orderId = response?.data?.orderId
    //@ts-expect-error payload data
    const paymentMethod = response?.data?.paymentOption

    const checkoutPayload = {
      payment_mode: paymentMethod,
      orderId,
    }
    const checkoutUrl =
      "https://api.edify.club/edifyweb-backend/v1/cart/checkout"

    const checkoutRes = await callAPIWithToken(
      checkoutUrl,
      "POST",
      checkoutPayload
    )

    console.log(checkoutRes.data, "checkout")
    return checkoutRes.data
  } catch (error: any) {
    throw new Error(error.response || "Failed to create orderID.")
  }
}
