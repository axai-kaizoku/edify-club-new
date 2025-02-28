import { Container } from "@/components/common/container"
import React from "react"
import B2BHero from "./_components/hero"
import Testimonials from "../_components/testimonials/testimonials"
import Blogs from "../_components/blogs/blogs"
import { FAQ } from "../products/[id]/_components/faq"
import Partners from "./_components/partners"
import Trust from "./_components/trust"
import Impact from "./_components/impact"
import Investors from "./_components/investors"
import { Metadata } from "next"
import { siteConfigB2B } from "@/config/site"

export const metadata: Metadata = {
	metadataBase: new URL(siteConfigB2B.url),
	title: siteConfigB2B.name,
	description: siteConfigB2B.description,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfigB2B.url,
		title: siteConfigB2B.name,
		description: siteConfigB2B.description,
		siteName: siteConfigB2B.name,
		images: `${siteConfigB2B.url}/og_b2b.png`,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfigB2B.name,
		description: siteConfigB2B.description,
		images: `${siteConfigB2B.url}/og_b2b.png`,
	},
	icons: {
		icon: '/edify-logo.svg',
	},
};

function B2B() {
  return (
    <Container>
      <B2BHero />
      <Partners heading="Trusted by 50+ Startups" />
      <Impact />
      <Trust />
      <Investors heading="Loved by 50+ startup founders" />
      <div className="flex flex-col sm:mt-20 gap-16 sm:gap-24">
        <Blogs />
        <Testimonials />
        <FAQ />
      </div>
    </Container>
  )
}

export default B2B
