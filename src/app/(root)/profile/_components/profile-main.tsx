"use client"

import { Container } from "@/components/common/container"
import { useState } from "react"
import { IndianFlag } from "./icons"
import { ProfileActions } from "./profile-actions"
import { OrdersSection } from "./order-section"
import { updateProfile } from "@/server/api/profileActions"

export default function ProfileMain({ data }: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: data?.name || "",
    email: data?.email || "",
    phone: data?.phone || "",
    gender: data?.gender || "",
    address: data?.addressDetails?.[0]?.address || "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle Save Profile
  const handleSave = async () => {
    console.log(userData)
    try {
      const response=await updateProfile({ payload: userData })
      console.log("API response: ", response); 
      setIsEditing(false) // Switch back to view mod
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <Container className="my-6 lg:my-10 h-full min-h-screen">
      <h2 className="text-xl lg:text-2xl font-gilroySemiBold text-center lg:text-left mb-8">
        Profile
      </h2>

      <section className="flex w-full justify-between lg:items-stretch h-full min-h-0 lg:h-48">
        <div className="flex w-full lg:w-[74%] h-full items-center border border-[#DEDEDE] rounded-xl">
          <img
            src={data?.image || "/media/profile/profile.png"} 
            alt={data?.name}
            className="object-cover rounded-xl w-24 h-24 lg:w-40 lg:h-40 m-3.5"
          />

          <div className="flex flex-col justify-evenly gap-y-3 lg:gap-0 lg:pl-5 items-start w-full h-full">
            <h3 className="text-base lg:text-[1.6rem] h-fit font-gilroySemiBold">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData?.name}
                  onChange={handleChange}
                  className="border p-1 rounded-md w-full"
                />
              ) : (
                userData?.name || "-"
              )}
            </h3>
            <div className="grid grid-cols-2 lg:flex lg:justify-between w-full h-fit lg:pr-8 xl:pr-14">
              {/* Email Field */}
              <div className="flex flex-col gap-0 lg:gap-y-1">
                <span className="text-[#AFAFAF] text-xxs lg:text-base font-gilroyMedium">
                  Email
                </span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userData?.email}
                    onChange={handleChange}
                    className="border p-1 rounded-md w-full"
                  />
                ) : (
                  <span className="text-xs lg:text-lg font-gilroyMedium truncate text-center">
                    {userData?.email || "-"}
                  </span>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-0 lg:gap-y-1">
                <span className="text-[#AFAFAF] text-xxs lg:text-base font-gilroyMedium">
                  Phone
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={userData?.phone}
                    onChange={handleChange}
                    className="border p-1 rounded-md w-full"
                  />
                ) : (
                  <span className="text-xs lg:text-lg font-gilroyMedium flex items-center gap-x-1">
                    <IndianFlag className="size-3.5 lg:size-7" />
                    {userData?.phone || "-"}
                  </span>
                )}
              </div>

              {/* Gender Field */}
              <div className="flex flex-col gap-0 lg:gap-y-1">
                <span className="text-[#AFAFAF] text-xxs lg:text-base font-gilroyMedium">
                  Gender
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="gender"
                    value={userData?.gender}
                    onChange={handleChange}
                    className="border p-1 rounded-md w-full"
                  />
                ) : (
                  <span className="text-xs lg:text-lg font-gilroyMedium text-center">
                    {userData?.gender || "-"}
                  </span>
                )}
              </div>

              {/* Address Field */}
              <div className="flex flex-col gap-0 lg:gap-y-1">
                <span className="text-[#AFAFAF] text-xxs lg:text-base font-gilroyMedium">
                  City
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={userData?.address}
                    onChange={handleChange}
                    className="border p-1 rounded-md w-full"
                  />
                ) : (
                  <address className="text-xs lg:text-lg not-italic font-gilroyMedium text-center">
                    {userData?.address || "-"}
                  </address>
                )}
              </div>
            </div>
          </div>
        </div>

        <ProfileActions
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleSave={handleSave}
        />
      </section>

      <h2 className="text-xl lg:text-2xl font-gilroySemiBold text-center lg:text-left my-8">
        My Orders
      </h2>

      <OrdersSection />
    </Container>
  )
}
