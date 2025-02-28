import { callAPI } from "../helper"

export type Testimonial = {
  _id: string
  orgId: string | null
  userId: string
  content: string
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  __v: number
}

export async function fetchAllTestimonials() {
  try {
    const res = await callAPI<Testimonial[]>(
      `https://api.edify.club/edifyweb-backend/v1/testimonials/`, // API endpoint
      "GET", // HTTP method
      null,
      {
        "Content-Type": "application/json",
      }
    )
    // console.log(res)

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "An error occurred while fetching blogs"
    )
  }
}
