import { AxiosError } from "axios"
import { cache } from "react"
import { callAPIWithToken } from "../helper"
// import { callAPI } from "./helper"

export type Order = {
  orderId: string
  deliveryDate: string
  deliveryStatus: string
  orderTotal: string
  items: {
    image: string[]
    deviceName: string
    price: string
    storage: string
    ram: string
    processor: string
    color: string
    qty: string
  }[]
}

export async function fetchOrders(
  type: "all-orders" | "in-transit" | "delivered" | "cancelled"
) {
  let apiURL =
    "https://api.edify.club/edifyweb-backend/v1/soldInventory/user";

  switch (type) {
    case "in-transit":
      apiURL += "?status=inTransit";
      break;
    case "delivered":
      apiURL += "?status=delivered";
      break;
    case "cancelled":
      apiURL += "?status=cancelled";
      break;
  }

  try {
    const res = await callAPIWithToken<any[]>(apiURL, "GET");
    return res?.data; // Ensure correct data is returned
  } catch (error) {
    const axiosError = error as AxiosError;
    throw {
      status: axiosError.response?.status || 500,
      message: axiosError.response?.data?.message || "Something went wrong",
    };
  }
}


export const getOrderByID = async function ({orderId}:{orderId:string}): Promise<any> {
  try {
    const res = await callAPIWithToken<any>(
      `https://api.edify.club/edifyweb-backend/v1/cart/${orderId}`,
      "GET"
    )
    return res?.data
  } catch (e) {
    throw new Error((e as AxiosError)?.message)
  }
}
