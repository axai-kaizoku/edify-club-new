import { IndianFlag } from "@/app/(root)/profile/_components/icons"
import { Input } from "@/components/ui/input"
import { createAddress } from "@/server/api/addressActions"
import { useRouter } from "next/navigation"
import React, { ReactEventHandler } from "react"

interface AddressForm {
  setIsDrawerOpen: (val: boolean) => void
  formData: any
  setFormData: any
  errors: any
  page: number
  setPage: (num: number) => void
  validateForm: any
}

const NewAddressForm = ({
  setIsDrawerOpen,
  formData,
  setFormData,
  errors,
  page,
  validateForm,
  setPage,
}: AddressForm) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const [loading, setLoading] = React.useState(false)
  const [apiError, setApiError] = React.useState("")
  const router = useRouter();

  const handleAddressSubmit = async () => {
    setApiError("")
    setLoading(true) // Show loading state

    console.log(formData);
    if (!validateForm()) {
      setApiError("Please fill all required fields.")
      setLoading(false)
      return
    }

    try {
      const payload = {
        city: formData?.city,
        pinCode: formData?.zip,
        state: formData?.state,
        address: formData?.address || formData?.country,
      }
      const response = await createAddress(payload)
      setPage(1)
      setIsDrawerOpen(false)
      router.refresh();
      setFormData({fullName: "",
        phone: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        address:"",
        terms: false,})
    } catch (error: any) {
      setApiError(error.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* MOBILE VIEW */}

      <section className="mt-2 px-2 flex flex-col gap-3 sm:hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAddressSubmit()
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-base font-gilroyMedium">
              Name
            </label>
            <Input
              placeholder="Enter name"
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleChange}
              required
            />
          </div>

          {errors.fullName && (
            <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
              {errors.fullName}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="text-base font-gilroyMedium">
              Full Address
            </label>
            <Input
              placeholder="Enter your full address..."
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              required
            />
          </div>

          {errors.address && (
            <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
              {errors.address}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="zip" className="text-base font-gilroyMedium">
              Zip Code
            </label>
            <Input
              placeholder="Enter your zip code..."
              type="text"
              name="zip"
              value={formData.zip || ""}
              onChange={handleChange}
              required
            />
          </div>

          {errors.zip && (
            <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
              {errors.zip}
            </p>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-base font-gilroyMedium">
              Phone number
            </label>
            <div className="flex items-center border px-4 py-1.5 rounded-[10px] gap-5">
              <IndianFlag />
              <input
                type="number"
                name="phone"
                maxLength={10}
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full focus:outline-none"
                placeholder="Enter phone number..."
              />
            </div>
          </div>

          {errors.phone && (
            <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
              {errors.phone}
            </p>
          )}

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="default_address"
              id="default_address"
              className="size-4"
              checked={formData.default_address || false}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  default_address: e.target.checked,
                }))
              }
            />
            <label htmlFor="default_address" className="text-sm text-[#808080]">
              Make this the default address
            </label>
          </div>

          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <button
            type="submit"
            className="bg-black text-white text-sm py-3 rounded-[8px]"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
        </form>
      </section>

      {/* WEB VIEW */}

      <section className="justify-center  flex flex-col sm:mx-8 md:mx-16 lg:mx-24 max-sm:hidden">
        <section className="flex flex-col gap-5">
          <p className="text-xl font-gilroySemiBold leading-normal">
            Shipping Information
          </p>

          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base font-gilroyMedium">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                onChange={handleChange}
                value={formData.fullName}
                className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                placeholder="Enter full name"
              />

              {errors.fullName && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base font-gilroyMedium">
                Email address
              </label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.email}
                </p>
              )}
            </div> */}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-base text-[#1A1A1A] font-gilroyMedium leading-[22.4px]"
              >
                Phone number
              </label>
              <div className="flex items-center border border-[#E6E6E6] px-4 py-1.5 rounded-[10px] gap-5">
                <IndianFlag />

                <input
                  type="number"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  maxLength={10}
                  className="placeholder:text-[#818EA1 placeholder:font-gilroyRegular placeholder:text-base placeholder:leading-normal -mt-1 placeholder:py-0 w-full focus:border-none focus:outline-none"
                  placeholder="Enter phone number..."
                />
              </div>
              {errors.phone && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="" className="text-base font-gilroyMedium">
                Country
              </label>
              <Input
                type="text"
                name="country"
                onChange={handleChange}
                value={formData.country}
                className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                placeholder="Enter Country"
              />
              {errors.country && (
                <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                  {errors.country}
                </p>
              )}
            </div>

            <div className="flex lg:gap-5 sm:gap-2 ">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base font-gilroyMedium">
                  City
                </label>
                <Input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                  placeholder="Enter City"
                />
                {errors.city && (
                  <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base font-gilroyMedium">
                  State
                </label>
                <Input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={formData.state}
                  className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                  placeholder="Enter state"
                />

                {errors.state && (
                  <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                    {errors.state}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="" className="text-base font-gilroyMedium">
                  Zip Code
                </label>
                <Input
                  type="text"
                  name="zip"
                  onChange={handleChange}
                  value={formData.zip}
                  className="placeholder:text-[#818EA1] placeholder:text-base placeholder:font-gilroyRegular"
                  placeholder="Enter zip code"
                />

                {errors.zip && (
                  <p className="mt-0.5 text-xs font-gilroyMedium text-destructive">
                    {errors.zip}
                  </p>
                )}
              </div>
            </div>

            <p className="flex gap-2 items-center">
              <Input type="checkbox" id="terms" className="w-4" />
              <label
                htmlFor="terms"
                className="text-sm font-gilroyRegular leading-normal"
              >
                I have read and agree to the Terms and Conditions.
              </label>
            </p>

            <button
              type="button"
              onClick={handleAddressSubmit}
              disabled={loading}
              className={`bg-black text-white text-sm font-gilroySemiBold text-center py-3 tracking-[0.091px] rounded-[8px] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Proceed"}
            </button>
          </form>

          {apiError && <p className="mt-1 text-xs text-red-500">{apiError}</p>}
        </section>
      </section>
    </>
  )
}

export default NewAddressForm
