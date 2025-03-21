import "./globals.css"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Link from "next/link"
import { Providers } from "@/lib/providers"

const client = new ApolloClient({
  uri: "http://65.2.152.144:1337/graphql", // Replace with actual endpoint
  cache: new InMemoryCache(),
})
export const metadata: Metadata = {
  title: "Edify",
  description: "edify.club 🎉",
}

const gilroyRegular = localFont({
  src: "../../public/fonts/gilroy/Gilroy_Regular.ttf",
  // weight: "400",
  display: "block",
  variable: "--font-gilroy-regular",
})

const gilroyMedium = localFont({
  src: "../../public/fonts/gilroy/Gilroy_Medium.ttf",
  // weight: "500",
  display: "block",
  variable: "--font-gilroy-medium",
})

const gilroySemiBold = localFont({
  src: "../../public/fonts/gilroy/Gilroy_Semibold.ttf",
  // weight: "600",
  display: "block",
  variable: "--font-gilroy-semibold",
})

const gilroyBold = localFont({
  src: "../../public/fonts/gilroy/Gilroy_Bold.ttf",
  // weight: "700",
  display: "block",
  variable: "--font-gilroy-bold",
})

const orange = localFont({
  src: "../../public/fonts/orange-squash/Orange_Squash_Demo.ttf",
  display: "block",
  variable: "--font-orange",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${gilroyRegular.variable} 
          ${gilroyMedium.variable} 
          ${gilroySemiBold.variable} 
          ${gilroyBold.variable}
          ${orange.variable}
      antialiased h-full w-full`}
      >
        <Providers>
          {children}
          <ScreenSize />
        </Providers>
      </body>
    </html>
  )
}

export const ScreenSize = () => {
  return (
    <div className="fixed bottom-4 bg-muted right-4 z-[1000] flex h-12 w-12 items-center justify-center rounded-3xl ring-1 ring-muted-foreground font-gilroySemiBold">
      <Link href="/">
        <div className="block xs:hidden">xs</div>
        {/* Extra Small screens (smaller than 480px) */}
        <div className="hidden xs:block sm:hidden">sm</div>
        {/* Small screens (smaller than 640px) */}
        <div className="hidden sm:block md:hidden">md</div>
        {/* Medium screens (640px - 768px) */}
        <div className="hidden md:block lg:hidden">lg</div>
        {/* Large screens (768px - 1024px) */}
        <div className="hidden lg:block xl:hidden">xl</div>
        {/* Extra large screens (1024px - 1280px) */}
        <div className="hidden xl:block 2xl:hidden">2xl</div>
        {/* 2X large screens (1280px - 1536px) */}
        <div className="hidden 2xl:block">2xl+</div>
        {/* 2X large and above (1536px and up) */}
      </Link>
    </div>
  )
}
