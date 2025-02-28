"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { EyeCloseIcon } from "@/app/(auth)/login/_components/eye-open-icon"
import { EyeOpenIcon } from "@/app/(auth)/login/_components/eye-close-icon"
// import { signIn } from "next-auth/react"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setErrorMessage("")

  //   if (!email || !password) {
  //     setErrorMessage("Email and password are required.")
  //     return
  //   }

  //   try {
  //     setLoading(true)
  //     const response = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     })
  //     setLoading(false)

  //     console.log("clicked", response)

  //     if (response?.status === 200) {
  //       router.push("/")
  //       router.refresh()
  //     } else {
  //       setErrorMessage("Invalid credentials. Please try again.")
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     setErrorMessage("An error occurred. Please try again later.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form
      // onSubmit={handleSubmit}
      className="flex h-fit w-full flex-col gap-5 sm:gap-6 lg:gap-7 p-4"
    >
      <div className="group relative w-full">
        <label
          htmlFor="Name"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Name
        </label>
        <Input
          id="name"
          type="text"
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4  border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="group relative w-full">
        <label
          htmlFor="email"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4  border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className="group relative w-full">
        <label
          htmlFor="password"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Create Password
        </label>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4 border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-3 text-sm"
        >
          {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </button>
      </div>

      {errorMessage && (
        <p className="text-sm text-red-600 font-gilroyMedium">{errorMessage}</p>
      )}

      <div className="w-full flex justify-between items-center">
        <label className="flex justify-start gap-2" htmlFor="remember">
          <input type="checkbox" name="remember" id="remember" />
          <p className="text-sm font-gilroyMedium text-[#18181B]">
            I agree to{" "}
            <Link className="text-[#2563EB]" href={"#"}>
              Terms and Condition
            </Link>{" "}
            of Edify.Club
          </p>
        </label>
      </div>

      <Button
        type="submit"
        className="border rounded-[10px] font-gilroySemibold  bg-black text-white py-4"
      >
        {loading ? <Spinner className="stroke-white" /> : "Login"}
      </Button>

      <p className="text-[#64748B] text-[13px] font-gilroySemiBold -mt-2">
        Already have an account?{" "}
        <Link href="/signup" className="text-[#2563EB] lg:hidden">
          SignUp
        </Link>
        <Link href="/login" className="text-[#2563EB] max-lg:hidden">
          Login
        </Link>
      </p>
    </form>
  )
}
