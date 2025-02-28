"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Link from "next/link"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { EyeCloseIcon } from "./eye-open-icon"
import { EyeOpenIcon } from "./eye-close-icon"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const returnUrl = searchParams.get("returnUrl") ?? "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!email || !password) {
      setErrorMessage("Email and password are required.")
      return
    }

    try {
      setLoading(true)
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      setLoading(false)

      // console.log("clicked", response)

      if (!response?.error) {
        router.push(returnUrl)
        router.refresh()
      } else {
        setErrorMessage("Invalid credentials. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("An error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-fit w-full flex-col gap-5 sm:gap-6 lg:gap-7 p-4"
    >
      <div className="group relative w-full">
        <label
          htmlFor="Username"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          className={cn(
            errorMessage
              ? "border-destructive/80 focus-visible:border-destructive/80 focus-visible:ring-destructive/0 h-12"
              : "h-12 placeholder:text-gray-400 pl-4  border border-[#5F5F5F]",
            "focus:ring-[0.5px] ring-black rounded-md font-gilroyMedium"
          )}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your username"
        />
      </div>

      <div className="group relative w-full">
        <label
          htmlFor="password"
          className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-sm font-gilroyMedium text-foreground"
        >
          Password
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

      {/* <div className="w-full flex justify-between items-center">
        <label className="flex justify-start gap-2" htmlFor="remember">
          <input type="checkbox" name="remember" id="remember" />
          <p className="text-sm font-gilroyMedium text-[#18181B]">
            Remember me
          </p>
        </label>
        <Link
          href="/login/forgot-password"
          className="text-sm text-[#2563EB] font-gilroyMedium"
        >
          Forgot Password?
        </Link>
      </div> */}

      <Button
        type="submit"
        className="border rounded-[10px] font-gilroySemibold  bg-black text-white py-4"
      >
        {loading ? <Spinner className="stroke-white" /> : "Login"}
      </Button>

      <p className="text-[#64748B] text-[13px] font-gilroySemiBold -mt-2">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#2563EB] lg:hidden">
          SignUp
        </Link>
        <Link href="/signup" className="text-[#2563EB] max-lg:hidden">
          Create free account
        </Link>
      </p>
    </form>
  )
}
