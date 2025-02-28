import { callAPIWithToken } from "../helper"

export interface Review {
  _id?: string
  comment?: string
  rating?: number
  createdAt?: string
  updatedAt?: string
  image?: string
  designation?: string
  name?: string
}

export interface Device {
  _id?: string
  device_name?: string
  description?: string
  perfectFor?: {
    title?: string
    _id?: string
  }[]
  deviceFeatures?: {
    title?: string
    features?: {
      title?: string
      value?: string
      _id?: string
    }[]
    _id?: string
  }[]
  device_condition?: string
  qty?: number
  config?: {
    key?: string
    value?: string
    _id?: string
  }[]
  device_type?: string
  asset_serial_no?: string | null
  serial_no?: string | null
  ram?: string
  processor?: string
  is_charger_provided?: boolean
  storage?: string[]
  custom_model?: string
  brand?: string
  color?: string
  warranty_status?: string | null
  warranty_expiary_date?: string | null
  ownership?: string
  purchase_order?: string | null
  purchase_value?: number
  payable?: number
  os?: string | null
  image?: {
    url?: string
    _id?: string
  }[]
  is_trending?: boolean
  latest_release?: boolean
  createdAt?: string
  reviews?: Review[]
  overallReviews?: number
  overallRating?: number
}

export const LatestReleasesAssets = async () => {
  const payload = {
    fields: [],
    filters: [],
    isDeleted: false,
    pageLimit: 10,
    page: 1,
    sortOption: "",
  }

  const respose = await callAPIWithToken<Device>(
    "https://e3bd-13-235-211-22.ngrok-free.app/edifybackend/v1/devices/assets?isLatest=true",
    "POST",
    payload
  )
  return respose.data
}

export const createDeviceReview = async (formData: {
  comment: string
  rating: string
  deviceId: string
  userId: string
}) => {
  const payload = {
    comment: formData.comment,
    rating: parseInt(formData.rating),
    deviceId: formData.deviceId,
    userId: formData.userId,
  }

  try {
    const response = await callAPIWithToken<Device>(
      "https://api.edify.club/edifyweb-backend/v1/reviews",
      "POST",
      payload
    )
    return response.data
  } catch (error) {
    console.error("Error creating device review:", error)
    throw error
  }
}

export const addRecentlyViewed = async (id: string) => {
  try {
    const response = await callAPIWithToken<Device>(
      `https://api.edify.club/edifyweb-backend/v1/product/recently-viewed/${id}`,
      "POST",
      {}
    )
    return response.data
  } catch (error) {
    console.error("Error :", error)
    throw error
  }
}
