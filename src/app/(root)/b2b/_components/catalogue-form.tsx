/* eslint-disable @next/next/no-img-element */
"use client"
import axios from "axios"
import { ArrowDown, Cross, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, ChangeEvent } from "react"
import { startUpCatalogueForm } from "../../../../config/fpixel"

interface FormData {
  name: string
  startupName: string
  role: string
  phone: string
  email: string
  teamSize: string
}

interface FormErrors {
  name: string
  startupName: string
  role: string
  phone: string
  email: string
  teamSize: string
}

export default function CatalogueForm({ onClose, onDownload }: any) {
  const params = useSearchParams()
  const [isClosing, setIsClosing] = useState(false)
  const [phone, setPhone] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    startupName: "",
    role: "",
    phone: "",
    email: "",
    teamSize: "",
  })

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    startupName: "",
    role: "",
    phone: "",
    email: "",
    teamSize: "",
  })

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }, [isClosing, onClose])

  const handleClose = () => {
    setIsClosing(true)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Remove error state when user starts typing
    if (errors[name as keyof FormErrors] && value.trim()) {
      setErrors({
        ...errors,
        [name as keyof FormErrors]: "",
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors: FormErrors = {
      name: "",
      startupName: "",
      role: "",
      phone: "",
      email: "",
      teamSize: "",
    }
    let errorMessage = ""

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      errorMessage += "Name is required. "
      isValid = false
    }
    if (!formData.startupName.trim()) {
      newErrors.startupName = "Startup Name is required"
      errorMessage += "Startup Name is required. "
      isValid = false
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
      errorMessage += "Role is required. "
      isValid = false
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone.trim())) {
      newErrors.phone = "Phone number is invalid  "
      errorMessage += "Phone number is required  . "
      isValid = false
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Email is invalid"
      errorMessage += "Email is invalid. "
      isValid = false
    }
    if (!formData.teamSize.trim()) {
      newErrors.teamSize = "Number of laptop is required"
      errorMessage += "Number of laptop is required. "
      isValid = false
    }

    setErrors(newErrors)
    setErrorMessage(errorMessage)

    return isValid
  }

  const handleDownloadClick = async () => {
    if (validateForm()) {
      try {
        const response = {
          name: formData.name,
          startup_name: formData.startupName,
          role: formData.role,
          phone: phone,
          email: formData.email,
          team_size: formData.teamSize,
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_campaign: params.get("utm_campaign") || "",
          utm_content: params.get("utm_content") || "",
          type: "Startup Form",
          pageTitle: window.location.href,
        }

        console.log("startup form", response)
        await axios.post(
          "https://api.edify.club/v2/mkt/requests/startup/form",
          response
        )
        startUpCatalogueForm()
      } catch (error: any) {
        throw new Error("Something went Wrong", error)
      } finally {
        setIsClosing(true)
      }
      setTimeout(() => {
        onDownload()
      }, 300)
    }
  }

  const handleTeamSizeChange = (size: string) => {
    setFormData({
      ...formData,
      teamSize: size,
    })
  }

  const roleOptions = [
    "Co-founder",
    "Product Manager",
    "Head of HR",
    "Office Manager",
    "IT Admin/Manager",
    "Finance Manager",
    "Others",
  ]

  return (
    <section className="fixed  mt-28 sm:mt-20 inset-0 z-40 flex justify-center items-center bg-black bg-opacity-80">
      <div
        className={`relative w-full max-sm:w-[90%] max-w-sm md:max-w-2xl lg:max-w-3xl p-4 pt-8 bg-white rounded-lg shadow-lg transition-transform transform ${
          isClosing ? "scale-95 modal-exit" : "scale-100 modal-enter"
        } ${isClosing ? "opacity-0" : "opacity-100"}`}
      >
        <button
          className="absolute top-4 right-4 w-6 h-6 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <X />
        </button>
        <div className="flex justify-center items-center w-full flex-col py-2 gap-3">
          <h1 className="text-xl sm:text-3xl font-orange">
            Start your Journey with us!
          </h1>
          <div className="text-xs sm:text-base text-neutral-500 px-2 font-gilroyMedium">
            Leave your details here to get a callback from our sales experts.
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-1/2 p-4 flex flex-col justify-center">
            <form className="space-y-3 font-gilroyMedium">
              <input
                type="text"
                required
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              <br />
              <input
                type="text"
                required
                name="startupName"
                placeholder="Enter your Startup Name"
                value={formData.startupName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                  errors.startupName ? "border-red-500" : ""
                }`}
              />
              <div className="relative">
                <select
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full appearance-none px-4 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                    errors.role ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ArrowDown
                  size={16}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
              <input
                type="tel"
                required
                name="phone"
                placeholder="+91 Enter your phone number"
                prefix="+91"
                maxLength={13}
                value={`${phone}`}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />{" "}
              <br />
              <input
                type="email"
                required
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring-1 focus:ring-black ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              <div className="space-y-2">
                <div className="text-base font-normal text-zinc-400">
                  Number Of Laptops
                </div>
                <div className="flex space-x-2">
                  {["5 - 25", "26 - 50", "51 - 100", "100 +"].map((size) => (
                    <div
                      key={size}
                      onClick={() => handleTeamSizeChange(size)}
                      className={`flex-1 py-2 border rounded-sm text-center cursor-pointer transition-colors ${
                        formData.teamSize === size
                          ? "bg-black text-white"
                          : "bg-white text-zinc-400 border-zinc-400 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs">{errorMessage}</p>
              )}
              <button
                onClick={handleDownloadClick}
                type="button"
                className="w-full py-3 bg-black text-white text-xs sm:text-lg font-medium rounded-md focus:outline-none hover:bg-gray-800"
              >
                Request a Call
              </button>
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:flex w-full lg:w-1/2 p-4 justify-center items-center">
            <img
              alt="human illustration"
              src="/media/startup-form.png"
              className="object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
