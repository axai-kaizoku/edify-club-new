'use server'
import { AxiosError } from "axios"
import { callAPIWithToken } from "../helper"
import { auth } from "../auth"
import { User } from "./loginActions"

export const updateProfile = async function ({payload}:{payload:User}): Promise<any> {
    const sess = await auth();
    console.log("payload----->",payload);
  try {
    if (sess?.user && sess?.user?.user._id) {
    const res = await callAPIWithToken<any>(
      `https://api.edify.club/edifyweb-backend/v1/user/${sess?.user?.user._id}`,
      "PUT",
      {name:payload.name, email:payload.email, phone:payload.phone, gender:payload.gender}
    )
    return res?.data
    }
  } catch (e) {
    throw new Error((e as AxiosError)?.message)
  }
}
