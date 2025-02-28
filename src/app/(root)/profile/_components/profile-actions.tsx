"use client"

import { Delete, Edit, Logout } from "./icons"
import { signOut } from "next-auth/react"

export const ProfileActions = ({ isEditing, setIsEditing, handleSave }:any) => {
  return (
    <div className="hidden lg:flex space-y-1 w-[24%] h-full flex-col border border-[#DEDEDE] rounded-xl">
      {/* <button
        onClick={() => {
          if (isEditing) {
            handleSave()
          }
          setIsEditing(!isEditing)
        }}
        className="flex gap-x-3 items-center h-full w-full text-[#0076FF] font-gilroyMedium whitespace-nowrap px-5 hover:bg-[#F9F9F9] rounded-xl cursor-pointer"
      >
         <Edit />
        {isEditing ? "Save Profile" : "Edit Profile"}
      </button> */}

      <button onClick={() => signOut()} className="flex gap-x-3 items-center h-full w-full font-gilroyMedium whitespace-nowrap px-5 hover:bg-[#F9F9F9] rounded-xl cursor-pointer">
        <Logout />
        Logout
      </button>

      <button className="flex gap-x-3 items-center h-full w-full text-[#F00] font-gilroyMedium whitespace-nowrap px-5 hover:bg-[#F9F9F9] rounded-xl cursor-pointer">
        <Delete />
        Delete Account
      </button>
    </div>
  )
}
