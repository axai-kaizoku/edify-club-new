import { callAPIWithToken } from "../helper"

export type Blog = {
  orgId: string | null
  userId: string | null
  _id: string
  thumbnail: string
  banner_image: string
  title: string
  desc: string
  orgID: string
  userID: string
  createdAt: string
  updatedAt: string
}

export async function fetchAllBlogs() {
  try {
    const res = await callAPIWithToken<Blog[]>(
      `https://api.edify.club/edifyweb-backend/v1/blog`, // API endpoint
      "GET", // HTTP method
      null
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
