import { PropsWithChildren } from "react"

import { Header } from "@/components/common/header"
import Footer from "@/components/common/footer"
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: siteConfig.name,
	description: siteConfig.description,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: `${siteConfig.url}/og_main.png`,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: `${siteConfig.url}/og_main.png`,
	},
	icons: {
		icon: '/edify-logo.svg',
	},
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="h-full w-full">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
