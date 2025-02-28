import { Suspense } from "react"
import LoginForm from "./_components/login-form"

export default function Page() {
  return (
    <div className="w-full h-screen justify-around flex flex-col lg:flex-row p-8 max-lg:p-2 max-lg:gap-5">
      <div className="lg:w-[46%] lg:h-full max-lg:w-full">
        <img
          src="/media/login-new.webp"
          alt="edify-background"
          className="object-contain h-[720px] max-lg:h-96 w-[100%] max-lg:w-[120%]"
        />
      </div>
      <div className="w-[42%] relative h-full justify-center items-center flex flex-col max-lg:w-full">
        <div
          className={`font-gilroy flex w-full flex-col gap-y-[17px] text-center  `}
        >
          <div className="flex items-center">
            <div className="flex h-full w-full flex-shrink-0 flex-col justify-center overflow-clip pr-[0.31px] pt-[0.51px] text-center">
              <div className="flex h-[53px] max-lg:h-fit max-lg:text-4xl flex-shrink-0 items-center justify-center text-[45px] font-bold leading-[53px] tracking-[-1.72px] text-gray-950">
                <p className="text-center font-orange font-medium tracking-[-1.723px]">
                  {"Welcome Again"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center px-16 max-lg:px-0 font-gilroyMedium leading-[26px] tracking-[0px] text-zinc-600 mb-4">
            <p className="text-center w-[80%] text-sm max-lg:hidden">
              Log in to access your account and manage your assets effortlessly
              with DeviceFlow.
            </p>
            <p className="text-center w-[80%] text-sm lg:hidden">
              Sign in for top-quality, certified devices at great prices.
            </p>
          </div>
        </div>
        <div className="w-[76%] max-lg:w-full h-fit max-lg:mt-4">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
