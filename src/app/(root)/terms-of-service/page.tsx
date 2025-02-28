import { siteConfigTermsOfServices } from "@/config/site";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: siteConfigTermsOfServices.name,
	description: siteConfigTermsOfServices.description,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfigTermsOfServices.url,
		title: siteConfigTermsOfServices.name,
		description: siteConfigTermsOfServices.description,
		siteName: siteConfigTermsOfServices.name,
		images: `${siteConfigTermsOfServices.url}/og_main.png`,
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfigTermsOfServices.name,
		description: siteConfigTermsOfServices.description,
		images: `${siteConfigTermsOfServices.url}/og_main.png`,
	},
	icons: {
		icon: 'edify-logo.svg',
	},
};


const TermsOfService = () => {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col w-[87%] sm:w-4/5">
        <div className="flex flex-col text-center gap-8 py-4 sm:py-14 border-b">
          <h3 className="text-3xl sm:text-5xl font-orange">Terms of Service</h3>
          <p className="font-gilroySemiBold text-lg sm:text-xl">
            By accessing and using Edify's services, you agree to abide by the
            terms and conditions outlined below. Please read them carefully.
          </p>
        </div>

        <div className="flex flex-col gap-8 py-6 sm:py-14">
          <h3 className="text-2xl sm:text-4xl font-orange">User Agreement</h3>
          <ul className="list-disc pl-6 text-base sm:text-lg font-gilroyRegular">
            <li>You must be at least 18 years old to use our services.</li>
            <li>
              By creating an account, you agree to provide accurate and complete
              information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl sm:text-4xl font-orange">Prohibited Activities</h3>
          <ul className="list-disc pl-6 text-base sm:text-lg font-gilroyRegular">
            <li>Using our platform for illegal or fraudulent activities.</li>
            <li>
              Attempting to gain unauthorized access to other user accounts or
              systems.
            </li>
            <li>Uploading malicious software or harmful content.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-6 py-6 sm:py-14">
          <h3 className="text-2xl sm:text-4xl font-orange">Limitation of Liability</h3>
          <p className="font-gilroyRegular text-base sm:text-lg">
            Edify is not liable for any indirect, incidental, or consequential
            damages arising from your use of our services. We do not guarantee
            uninterrupted access or error-free operation of the platform.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl sm:text-4xl font-orange">Changes to Terms</h3>
          <p className="font-gilroyRegular text-base sm:text-lg">
            Edify reserves the right to modify these terms at any time. Any
            changes will be posted on this page, and your continued use of our
            services constitutes acceptance of the updated terms.
          </p>
        </div>

        <div className="flex flex-col gap-6 py-6 sm:py-14">
          <h3 className="text-2xl sm:text-4xl font-orange">Contact Us</h3>
          <p className="font-gilroyRegular text-base sm:text-lg">
            If you have any questions about our Terms of Service, reach out to
            us at:
          </p>
          <ul className="list-disc pl-6 text-base sm:text-lg font-gilroyRegular">
            <li>
              Email: <a className="hover:underline font-gilroySemiBold" href="mailto:contact@edify.club">contact@edify.club</a>
            </li>
            <li>
              Phone: <a className="hover:underline font-gilroySemiBold" href="tel:+919513245671">+91 9513245671</a> (Mon-Sat, 10 AM - 7 PM)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;