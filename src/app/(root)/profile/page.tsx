import { auth } from "@/server/auth"
import { redirect } from "next/navigation"
import ProfileMain from "./_components/profile-main"

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect("/login?returnUrl=/profile")
  }
  // const data = {
  //   name: "Ashwini Purohit",
  //   image: "/media/profile/profile.png",
  //   gender: "Male",
  //   phone: "7470873515",
  //   address: "Bengaluru, IN",
  //   email: "ashiwni@winuall.com",
  // }
  const data = session.user.user
  console.log(data)

  return (
    <ProfileMain data={data} />
  )
}
