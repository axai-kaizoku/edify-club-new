"use server"

import axios, { AxiosError, AxiosResponse } from "axios"
import { auth } from "./auth"

export const getTokenFromSession = async () => {
  const session = await auth()
  const token = session?.user?.token
  return token
}

interface APIResponse<T> {
  data: T
  status: number
}

export async function callAPIWithToken<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body: unknown = null,
  headers: Record<string, string> = {} // Allow passing custom headers
): Promise<APIResponse<T>> {
  // Retrieve the token
  const token = await getTokenFromSession()
  // console.log(token)

  if (!token) {
    throw new Error("Unauthorized: No token available.")
  }

  try {
    // Default headers, including Authorization
    const defaultHeaders: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      ...headers, // Allow additional headers to be passed
    }

    // Set 'Content-Type' only if not already provided (for multipart/form-data)
    if (!defaultHeaders["Content-Type"]) {
      defaultHeaders["Content-Type"] = "application/json"
    }

    // Make the API call using axios
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data:
        method === "POST" || method === "PUT" || method === "PATCH"
          ? body
          : undefined,
      headers: defaultHeaders,
    })

    // Return response data and status
    return {
      data: response?.data as T,
      status: response?.status,
    }
  } catch (error) {
    // Handle Axios-specific errors
    if (error instanceof AxiosError) {
      // console.error('API call failed:', error?.response?.data || error?.message);
      throw new Error(
        error?.response?.data?.message || error?.message || "API request failed"
      )
    }
    // Handle unexpected errors
    throw new Error("An unexpected error occurred during the API request")
  }
}

export const callAPI = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown,
  headers?: Record<string, string>
): Promise<APIResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await axios({
      url,
      method,
      data: method !== "GET" ? body : undefined,
      headers,
    })

    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    console.error("❌ API call failed:", error)
    if (error instanceof AxiosError) {
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "❌ API request failed"
      )
    }
    throw new Error(`❌ API Request Failed`, {
      cause: error,
    })
  }
}
